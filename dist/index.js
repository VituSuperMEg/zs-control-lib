"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zObservability = exports.zStorage = exports.z = void 0;
const jwt_decode_1 = require("jwt-decode");
const react_1 = require("react");
const logger_1 = require("./obs/class/logger");
const metrics_1 = require("./obs/class/metrics");
const tracer_1 = require("./obs/class/tracer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.z = {
    createStateManagement({ state, set }) {
        let globalState = state(); // Estado inicial
        const listeners = []; // Lista de ouvintes
        const updateState = (newState) => {
            globalState = Object.assign(Object.assign({}, globalState), newState);
            listeners.forEach((listener) => listener(globalState));
        };
        const setFunctions = set ? set(updateState) : {};
        const useStateManagement = () => {
            const [localState, setLocalState] = (0, react_1.useState)(globalState);
            (0, react_1.useEffect)(() => {
                const listener = (updatedState) => {
                    setLocalState(updatedState);
                };
                listeners.push(listener);
                return () => {
                    const index = listeners.indexOf(listener);
                    if (index > -1)
                        listeners.splice(index, 1);
                };
            }, []);
            return Object.assign(Object.assign({}, localState), setFunctions);
        };
        return useStateManagement;
    },
    temp: ({ value, watch, timeDestory = 0 }) => {
        const [tempValue, setTempValue] = (0, react_1.useState)(value);
        const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
        const addValue = (add) => {
            const newValue = tempValue + add;
            setTempValue(newValue);
            if (watch()) {
                destroy();
            }
            return newValue;
        };
        const destroy = () => {
            setTempValue(value);
            setResetTrigger((prev) => prev + 1);
        };
        (0, react_1.useEffect)(() => {
            if (timeDestory > 0) {
                const timer = setTimeout(() => {
                    destroy();
                }, timeDestory);
                return () => clearTimeout(timer);
            }
        }, [timeDestory, resetTrigger]);
        return {
            value: tempValue,
            addValue,
        };
    },
    createEventChannel() {
        const subscribers = new Set();
        return {
            subscribe: (callback) => {
                subscribers.add(callback);
            },
            unsubscribe: (callback) => {
                subscribers.delete(callback);
            },
            publish: (data) => {
                subscribers.forEach((callback) => callback(data));
            },
        };
    },
};
exports.zStorage = {
    setHook(hook) {
        let storageKey = "";
        let config = { typeStorage: "localStorage" };
        return {
            key(key) {
                storageKey = key;
                return this;
            },
            config(newConfig) {
                config = Object.assign(Object.assign({}, config), newConfig);
                return this;
            },
            addValueInKey(value) {
                const storage = getStorage(config.typeStorage);
                const existingValue = storage.getItem(storageKey);
                const mergedValue = Object.assign(Object.assign({}, JSON.parse(existingValue || "{}")), value);
                storage.setItem(storageKey, JSON.stringify(mergedValue));
            },
            destroy() {
                const storage = getStorage(config.typeStorage);
                storage.removeItem(storageKey);
            },
            generateToken(payload, secretKey, expiresIn = "1h") {
                const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
                return token;
            },
            jwtDecodeKey() {
                const storage = getStorage(config.typeStorage);
                const storedValue = storage.getItem(storageKey);
                if (!storedValue) {
                    return { decode: null, old: null };
                }
                try {
                    const decoded = (0, jwt_decode_1.jwtDecode)(storedValue);
                    return { decode: decoded, old: storedValue };
                }
                catch (error) {
                    console.error("Error decoding JWT:", error);
                    return { decode: null, old: storedValue };
                }
            },
        };
        function getStorage(type) {
            if (type === "localStorage")
                return window.localStorage;
            if (type === "cookieStorage")
                return createCookieStorage();
            if (type === "passwordStorage")
                throw new Error("Not implemented");
            throw new Error("Invalid storage type");
        }
        function createCookieStorage() {
            return {
                getItem: (key) => {
                    var _a;
                    return (_a = document.cookie
                        .split("; ")
                        .find((row) => row.startsWith(key))) === null || _a === void 0 ? void 0 : _a.split("=")[1];
                },
                setItem: (key, value) => {
                    document.cookie = `${key}=${value}; path=/`;
                },
                removeItem: (key) => {
                    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                },
            };
        }
    },
};
exports.zObservability = {
    create(config) {
        const logger = new logger_1.Logger(config.serviceName);
        const metrics = new metrics_1.Metrics();
        const tracer = new tracer_1.Tracer();
        return {
            logger,
            metrics,
            tracer,
        };
    },
};

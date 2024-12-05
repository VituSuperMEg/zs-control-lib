"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.memoize = exports.compose = exports.pipe = void 0;
const pipe = (...fns) => {
    return (input) => {
        return fns.reduce((result, fn) => fn(result), input);
    };
};
exports.pipe = pipe;
const compose = (...fns) => {
    return (x) => fns.reduceRight((v, f) => f(v), x);
};
exports.compose = compose;
const memoize = (fn) => {
    const cache = new Map();
    return ((...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    });
};
exports.memoize = memoize;
const once = (fn) => {
    let called = false;
    return ((...args) => {
        if (!called) {
            called = true;
            return fn(...args);
        }
    });
};
exports.once = once;

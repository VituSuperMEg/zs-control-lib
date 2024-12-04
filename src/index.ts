import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export type StateCreator<T> = () => T;
export type SetFunction<T> = (
  update: (state: Partial<T>) => void
) => Record<string, any>;

export interface ZsControlConfig<T> {
  state: StateCreator<T>;
  set?: SetFunction<T>;
}

export interface ZsControl {
  createStateManagement<T>(
    config: ZsControlConfig<T>
  ): () => T & Record<string, any>;

  temp: <T>(config: TempConfig<T>) => TempState<T>;
}

export interface TempConfig<T> {
  value: T;
  watch: () => boolean;
  timeDestory?: number;
}

export interface TempState<T> {
  value: T;
  addValue: (add: T) => T;
}

export const z: ZsControl = {
  createStateManagement<T>({ state, set }: ZsControlConfig<T>) {
    let globalState = state(); // Estado inicial
    const listeners: Array<(state: T) => void> = []; // Lista de ouvintes

    const updateState = (newState: Partial<T>) => {
      globalState = { ...globalState, ...newState };
      listeners.forEach((listener) => listener(globalState));
    };

    const setFunctions = set ? set(updateState) : {};

    const useStateManagement = () => {
      const [localState, setLocalState] = useState(globalState);

      useEffect(() => {
        const listener = (updatedState: T) => {
          setLocalState(updatedState);
        };

        listeners.push(listener);

        return () => {
          const index = listeners.indexOf(listener);
          if (index > -1) listeners.splice(index, 1);
        };
      }, []);

      return {
        ...localState,
        ...setFunctions,
      };
    };

    return useStateManagement;
  },

  temp: <T>({ value, watch, timeDestory = 0 }: TempConfig<T>): TempState<T> => {
    const [tempValue, setTempValue] = useState<T>(value);
    const [resetTrigger, setResetTrigger] = useState(0);

    const addValue = (add: T): T => {
      const newValue = (tempValue as any) + add;
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

    useEffect(() => {
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
};

type StorageType = "localStorage" | "cookieStorage" | "passwordStorage";

interface ZStorageConfig {
  typeStorage: StorageType;
  satisfiesAuthentication?: boolean;
}

interface ZStorageInstance<T> {
  key: (key: string) => ZStorageInstance<T>;
  config: (config: ZStorageConfig) => ZStorageInstance<T>;
  addValueInKey: (value: Partial<T>) => void;
  destroy: () => void;
  jwtDecodeKey: () => { decode: any; old: any };
  generateToken: (
    payload: object,
    secretKey: string,
    expiresIn: string
  ) => string;
}

export const zStorage = {
  setHook<T>(hook: () => T): ZStorageInstance<T> {
    let storageKey = "";
    let config: ZStorageConfig = { typeStorage: "localStorage" };

    return {
      key(key: string) {
        storageKey = key;
        return this;
      },
      config(newConfig: ZStorageConfig) {
        config = { ...config, ...newConfig };
        return this;
      },
      addValueInKey(value: Partial<T>) {
        const storage = getStorage(config.typeStorage);
        const existingValue = storage.getItem(storageKey);
        const mergedValue = { ...JSON.parse(existingValue || "{}"), ...value };
        storage.setItem(storageKey, JSON.stringify(mergedValue));
      },
      destroy() {
        const storage = getStorage(config.typeStorage);
        storage.removeItem(storageKey);
      },
      generateToken(
        payload: object,
        secretKey: string,
        expiresIn: string = "1h"
      ) {
        const token = jwt.sign(payload, secretKey, { expiresIn });
        return token;
      },
      jwtDecodeKey() {
        const storage = getStorage(config.typeStorage);
        const storedValue = storage.getItem(storageKey);
        if (!storedValue) {
          return { decode: null, old: null };
        }
        try {
          const decoded = jwtDecode(storedValue);
          return { decode: decoded, old: storedValue };
        } catch (error) {
          console.error("Error decoding JWT:", error);
          return { decode: null, old: storedValue };
        }
      },
    };

    function getStorage(type: StorageType) {
      if (type === "localStorage") return window.localStorage;
      if (type === "cookieStorage") return createCookieStorage();
      if (type === "passwordStorage") throw new Error("Not implemented");
      throw new Error("Invalid storage type");
    }

    function createCookieStorage() {
      return {
        getItem: (key: string) =>
          document.cookie
            .split("; ")
            .find((row) => row.startsWith(key))
            ?.split("=")[1],
        setItem: (key: string, value: string) => {
          document.cookie = `${key}=${value}; path=/`;
        },
        removeItem: (key: string) => {
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        },
      };
    }
  },
};

import { ZObservability, ZObservabilityConfig } from "./obs/interfaces";
import { ZsControl, ZStorageConfig } from "./interfaces";
export declare const z: ZsControl;
interface ZStorageInstance<T> {
    key: (key: string) => ZStorageInstance<T>;
    config: (config: ZStorageConfig) => ZStorageInstance<T>;
    addValueInKey: (value: Partial<T>) => void;
    destroy: () => void;
    jwtDecodeKey: () => {
        decode: any;
        old: any;
    };
    generateToken: (payload: object, secretKey: string, expiresIn: string) => string;
}
export declare const zStorage: {
    setHook<T>(hook: () => T): ZStorageInstance<T>;
};
export declare const zObservability: {
    create(config: ZObservabilityConfig): ZObservability;
};
export {};

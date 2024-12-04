export type StateCreator<T> = () => T;
export type SetFunction<T> = (update: (state: Partial<T>) => void) => Record<string, any>;
export interface ZsControlConfig<T> {
    state: StateCreator<T>;
    set?: SetFunction<T>;
}
export interface ZsControl {
    createStateManagement<T>(config: ZsControlConfig<T>): () => T & Record<string, any>;
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
export declare const z: ZsControl;
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
    jwtDecodeKey: () => {
        decode: any;
        old: any;
    };
    generateToken: (payload: object, secretKey: string, expiresIn: string) => string;
}
export declare const zStorage: {
    setHook<T>(hook: () => T): ZStorageInstance<T>;
};
export {};

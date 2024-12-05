import { StateCreator, SetFunction, StorageType } from "../types";

export interface ZsControlConfig<T> {
  state: StateCreator<T>;
  set?: SetFunction<T>;
}
export interface EventChannel<T> {
  subscribe: (callback: (data: T) => void) => void;
  unsubscribe: (callback: (data: T) => void) => void;
  publish: (data: T) => void;
}
export interface ZsControl {
  createStateManagement<T>(
    config: ZsControlConfig<T>
  ): () => T & Record<string, any>;

  temp: <T>(config: TempConfig<T>) => TempState<T>;
  createEventChannel<T>(): EventChannel<T>;
  pipe: <TInput, TOutput>(
    ...fns: [
      (arg: TInput) => any,
      ...Array<(arg: any) => any>,
      (arg: any) => TOutput
    ]
  ) => (input: TInput) => TOutput;
  compose: <T>(
    ...fns: [(arg: T) => any, ...Array<(arg: any) => any>]
  ) => (x: T) => T;
  memoize: <T extends (...args: any[]) => any>(fn: T) => T;

  once: <T extends (...args: any[]) => any>(fn: T) => T;
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

export interface ZStorageConfig {
  typeStorage: StorageType;
  satisfiesAuthentication?: boolean;
}

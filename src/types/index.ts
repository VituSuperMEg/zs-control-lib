// Type do state inicial
export type StateCreator<T> = () => T;
export type SetFunction<T> = (
  update: (state: Partial<T>) => void
) => Record<string, any>;

export type StorageType = "localStorage" | "cookieStorage" | "passwordStorage";

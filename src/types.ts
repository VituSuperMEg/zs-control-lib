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
  temp: <T>({
    value,
    watch,
    timeDestory,
  }: {
    value: T;
    watch: () => boolean;
    timeDestory?: number;
  }) => {
    value: T;
    addValue: (add: T) => T;
  };
}

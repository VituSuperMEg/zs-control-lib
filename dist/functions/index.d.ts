export declare const pipe: <TInput, TOutput>(...fns: [(arg: TInput) => any, ...Array<(arg: any) => any>, (arg: any) => TOutput]) => (input: TInput) => TOutput;
export declare const compose: <T>(...fns: Array<(arg: T) => T>) => ((x: T) => T);
export declare const memoize: <T extends (...args: any[]) => any>(fn: T) => T;
export declare const once: <T extends (...args: any[]) => any>(fn: T) => T;

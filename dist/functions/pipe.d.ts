export declare const pipe: <TInput, TOutput>(...fns: [(arg: TInput) => any, ...Array<(arg: any) => any>, (arg: any) => TOutput]) => (input: TInput) => TOutput;

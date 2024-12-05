export const pipe = <TInput, TOutput>(
    ...fns: [
      (arg: TInput) => any, 
      ...Array<(arg: any) => any>, 
      (arg: any) => TOutput 
    ]
  ) => {
    return (input: TInput): TOutput => {
      return fns.reduce((result, fn) => fn(result), input as any) as TOutput;
    };
  };
  
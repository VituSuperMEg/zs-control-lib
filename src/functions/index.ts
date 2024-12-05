import { Component } from "react";

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

export const compose = <T>(...fns: Array<(arg: T) => T>): ((x: T) => T) => {
  return (x: T) => fns.reduceRight((v, f) => f(v), x);
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false;
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      return fn(...args);
    }
  }) as T;
};

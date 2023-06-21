export type Fn<TArgs, TReturn> = TArgs extends never
    ? () => TReturn
    : TArgs extends any[]
    ? (...args: TArgs) => TReturn
    : (arg: TArgs) => TReturn;

export type Nullable<T> = T | null | undefined;

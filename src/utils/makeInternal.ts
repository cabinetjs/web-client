import shortid from "shortid";

export type Internal<T> = T & { key: string };

export function makeInternal<T>(obj: T): Internal<T> {
    return { ...obj, key: shortid() };
}

export function makeInternalArray<T>(arr: T[]): Internal<T>[] {
    return arr.map(makeInternal);
}

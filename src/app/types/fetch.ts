export interface FetchBase {
  [name: string]: string | number | null | undefined;
}

export interface Headers extends FetchBase {}
export interface Params extends FetchBase {}

export type Body = any | null;
export type Options = FetchBase | Record<string, FetchBase | boolean | string[]>;

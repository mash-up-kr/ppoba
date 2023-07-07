export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends Record<string, unknown> ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

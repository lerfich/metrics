export type Prefer<P, T> = P & Omit<T, keyof P>;

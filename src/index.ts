/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Keys } from "./objects/keys";

export type Cast <A, B> = A extends B ? A : B;
export type Expand <T> = T extends T ? { [P in keyof T]: T[P] } : never;
export type UnionToIntersection <U> = (U extends U ? ((x: U) => any) : never) extends (x: infer I) => any ? I : never;

export type Merge <A, B> = {[K in Keys<A> | Keys<B>]: A[K & Keys<A>] | B[K & Keys<B>]};
export type AssignableToType<T, V> = { [K in Keys<T>]-?: T[K] extends V ? K : never };
export type KeysAssignableToType<T, V> = AssignableToType<T, V>[Keys<T>];
export type OmitByType<T, V> = Omit<T, KeysAssignableToType<T, V>>;

export type RequiredOnly <T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
};
export type OptionalOnly <T> = Omit<T, Keys<RequiredOnly<T>>>;

export type Constructor <P extends Array<any>, R> = new (...args: P) => R;
export type AbstractConstructor <P extends Array<any>, R> = abstract new (...args: P) => R;

export * as C from "./crypto";
export * as F from "./functions";
export * as M from "./math";
export * as O from "./objects";
export * as R from "./random";
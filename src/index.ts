/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */

export * as functions from "./functions";
export * as math from "./math";
export * as objects from "./objects";
export * as random from "./random";

export type Expand <T> = T extends T ? { [P in keyof T]: T[P] } : never;
export type UnionToIntersection <U> = (U extends U ? ((x: U) => any) : never) extends (x: infer I) => any ? I : never;
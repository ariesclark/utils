/* eslint-disable @typescript-eslint/no-explicit-any */

import { Cast } from "..";

import { create } from "./create";

import type { Keys } from "./keys";

export type Entries<T> = Array<{ [K in Keys<T>]: [K, T[K]] }[Keys<T>]>;

/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object The original object.
 */
export function entries<T>(object: T): Entries<T> {
	return Object.entries(object) as Entries<T>;
}

export type FromEntries<T> = T extends Array<[infer Key, any]>
	? { [K in Cast<Key, PropertyKey>]: Extract<T[number], [K, any]>[1] }
	: never;

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
export function fromEntries<T>(entries: T): FromEntries<T> {
	return create(Object.fromEntries(entries as unknown as Entries<never>)) as FromEntries<T>;
}

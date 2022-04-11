/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Expand, UnionToIntersection } from ".";

export type Keys <T> = keyof T;
export type Merge <A, B> = {[K in Keys<A> | Keys<B>]: A[K & Keys<A>] | B[K & Keys<B>]};
export type Cast<X, Y> = X extends Y ? X : Y;

export type Flatten <T, Z extends string = ""> = T extends object
	? Expand<UnionToIntersection<{
		[P in keyof T]: P extends string | number
			? T[P] extends object
				? Flatten<T[P], `${Z}${P}.`>
				: { [Q in `${Z}${P}`]: T[P] }
			: never
	}[keyof T & (T extends readonly unknown[] ? number : unknown)]>>
	: T;

type PrefixKeyof<T extends { [key: string]: unknown }> = {
	[P in keyof T]: P extends `${infer Q}.${string}` ? Q : never;
}[keyof T];

export type Unflatten <T extends { [key: string]: unknown }> = Expand<UnionToIntersection<
	| UnflattenDirect<T>
	| UnflattenIndirect<T, PrefixKeyof<T>>
>>;

type UnflattenDirect <T extends { [key: string]: unknown }> = {
	[P in keyof T]: P extends `${string}.${string}`
		? never
		: { [Q in P]: T[P] }
}[keyof T];

type UnflattenIndirect <T extends { [key: string]: unknown }, Z extends string> = Z extends Z
	? {
		[P in Z]: Expand<UnionToIntersection<{
			[P in keyof T]: P extends `${Z}.${infer Affix}`
				? Unflatten<{ [Q in Affix]: T[P] }>
				: never
		}[keyof T]>>
	}
	: never;

/** Array<[key, value]> */
export type Entries <T> = Array<{ [K in Keys<T>]: [K, T[K]] }[Keys<T>]>;
export type FromEntries <T> = T extends Array<[infer Key, any]>
	? { [K in Cast<Key, PropertyKey>]: Extract<T[number], [K, any]>[1] }
	: never

export type KeysAssignableToType<T, V> = { [K in Keys<T>]-?: T[K] extends V ? K : never }[Keys<T>]
export type OmitByType<T, V> = Omit<T, KeysAssignableToType<T, V>>

export type FilterPredicate <T> = (key: Keys<T>, value: T[typeof key], object: T) => boolean;
export type MapCallback <T> = (key: Keys<T>, value: T[typeof key], object: T) => [key: PropertyKey, value: any];

/**
 * Returns the names of the enumerable string properties and methods of an object.
 * @param object The original object.
 */
export const keys = <T> (object: T): Array<Keys<T>> =>
	Object.keys(object) as Array<Keys<T>>;

/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object The original object.
 */
export function entries <T> (object: T): Entries<T> {
	return Object.entries(object) as Entries<T>;
}

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
export function fromEntries <T> (entries: T): FromEntries<T> {
	return create(Object.fromEntries(entries as unknown as Entries<never>)) as FromEntries<T>;
}

/**
 * Create an object without a prototype.
 * @param object The original object.
 */
export function create <T> (object?: Readonly<T>): T {
	return Object.assign(Object.create(null), object || {});
}

/**
 * Remove keys from an object based on a function
 * predicate without mutating the original.
 *
 * @param object The original object.
 * @param predicate A predicate function to determine which keys to retain.
 * The filter method calls the predicate function one time for each element in the array.
 */
export function filter <T, R> (object: Readonly<T>, predicate: FilterPredicate<T>): R {
	return fromEntries(entries(object).filter(([key, value]) => predicate(key, value, object))) as unknown as R;
}

/**
 * Transform an object without mutating the original.
 *
 * @param object The original object.
 * @param callback The map method calls the callback function one time for each element in the array.
 */
export function map <T, R> (object: Readonly<T>, callback: MapCallback<T>): R {
	return fromEntries(entries(object).map(([key, value]) => callback(key, value, object))) as unknown as R;
}

/**
 * Pick keys from an object. This function creates a new object
 * with the specified keys. The original object is not mutated.
 *
 * @param object The original object.
 * @param keys An array of keys to keep.
 */
export function pick <T, K extends Array<Keys<T>>> (object: Readonly<T>, keys: K): Pick<T, K[number]> {
	const newObject = create<Pick<T, K[number]>>();
	for (const key of keys) newObject[key] = object[key];

	return newObject;
}

/**
 * Remove keys from an object. This function creates a new object
 * without the specified keys. The original object is not mutated.
 *
 * @param object The original object.
 * @param keys An array of keys to remove.
 */
export function omit <T, K extends Array<Keys<T>>> (object: Readonly<T>, keys: K): Omit<T, K[number]> {
	const newObject = create(object);
	for (const key of keys) delete newObject[key];

	return newObject;
}

/**
 * Turn an object into a single depth object.
 * @param object The original object.
 */
export function flatten <T> (object: T): Flatten<T> {
	const newObject = create<any>();

	function step (stepObject: any, parentKey?: string | number, depth: number = 0): void {
		for (const [key, value] of entries(stepObject)) {
			if (typeof key === "symbol") continue; // ignore symbols.
			const newKey = parentKey ? `${parentKey}.${key}` : key;

			if (typeof value === "object") {
				return void step(value, newKey, depth + 1);
			}

			newObject[newKey] = value;
		}
	}

	step(object);
	return newObject;
}

/**
 * Revert a flattened object to a nested object.
 * @todo This currently doesn't deal with arrays.
 * @param object The flattened object.
 */
export function unflatten <T extends { [key: string]: unknown; }> (object: T): Unflatten<T> {
	const newObject = create<any>();

	for (const key of keys(object)) {
		if (typeof key !== "string") continue;

		const nestedKeys = key.split(".").reverse();
		let receipt = newObject;

		while (nestedKeys.length >= 1) {
			const nestedKey = nestedKeys.pop();
			if (!nestedKey) continue;

			receipt[nestedKey] ??= {};

			if (nestedKeys.length === 0) {
				receipt[nestedKey] = object[key];
				continue;
			}

			receipt = receipt[nestedKey];
		}
	}

	return newObject;
}

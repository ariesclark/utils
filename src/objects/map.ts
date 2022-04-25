/* eslint-disable @typescript-eslint/no-explicit-any */

import { entries, fromEntries } from "./entries";

import type { Keys } from "./keys";

export type MapCallback <T> = (key: Keys<T>, value: T[typeof key], object: T) => [key: PropertyKey, value: any];

/**
 * Transform an object without mutating the original.
 *
 * @param object The original object.
 * @param callback The map method calls the callback function one time for each element in the array.
 */
export function map <T, R> (object: Readonly<T>, callback: MapCallback<T>): R {
	return fromEntries(entries(object).map(([ key, value ]) => callback(key, value, object))) as unknown as R;
}

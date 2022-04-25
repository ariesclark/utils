import { create } from "./create";

import type { Keys } from "./keys";

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
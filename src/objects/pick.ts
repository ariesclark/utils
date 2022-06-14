import { create } from "./create";

import type { Keys } from "./keys";

/**
 * Pick keys from an object. This function creates a new object
 * with the specified keys. The original object is not mutated.
 *
 * @param object The original object.
 * @param keys An array of keys to keep.
 */
export function pick<T, K extends Array<Keys<T>>>(
	object: Readonly<T>,
	keys: K
): Pick<T, K[number]> {
	const newObject = create<Pick<T, K[number]>>();
	for (const key of keys) newObject[key] = object[key];

	return newObject;
}

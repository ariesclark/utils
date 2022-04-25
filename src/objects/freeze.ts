import { create } from "./create";

/**
 * Prevents the modification of existing property attributes and values, 
 * and prevents the addition of new properties.
 *
 * @param object The original object.
 */
export function freeze <T> (object: T): Readonly<T> {
	return Object.freeze(create<T>(object));
}
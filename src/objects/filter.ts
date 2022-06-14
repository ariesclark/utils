import { entries, fromEntries } from "./entries";

import type { Keys } from "./keys";

export type FilterPredicate<T> = (key: Keys<T>, value: T[typeof key], object: T) => boolean;

/**
 * Remove keys from an object based on a function
 * predicate without mutating the original.
 *
 * @param object The original object.
 * @param predicate A predicate function to determine which keys to retain.
 * The filter method calls the predicate function one time for each element in the array.
 */
export function filter<T, R>(object: Readonly<T>, predicate: FilterPredicate<T>): R {
	return fromEntries(
		entries(object).filter(([key, value]) => predicate(key, value, object))
	) as unknown as R;
}

export type Keys <T> = keyof T;

/**
 * Returns the names of the enumerable string properties and methods of an object.
 * @param object The original object.
 */
export const keys = <T> (object: T): Array<Keys<T>> => Object.keys(object) as Array<Keys<T>>;
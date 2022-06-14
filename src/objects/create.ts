/**
 * Create an object without a prototype.
 * @param object The original object.
 */
export function create<T>(object?: Readonly<T>): T {
	return Object.assign(Object.create(null), object || {});
}

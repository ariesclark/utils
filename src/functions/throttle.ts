/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * To throttle a function means to ensure that the function is called at most once in a specified
 * time period (for instance, once every 10 seconds). This means throttling will prevent
 * a function from running if it has run “recently”.
 *
 * Throttling also ensures a function is run regularly at a fixed rate.
 *
 * @param callback The function the throttle.
 * @param delay Time in milliseconds
 * @returns The throttled function.
 */
export function throttle <T extends (...args: Array<any>) => void> (callback: T, delay: number): T {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return ((...args: Parameters<T>) => {
		if (timer) return;

		timer = setTimeout(() => {
			callback(...args);
			timer = null;
		}, delay);
	}) as unknown as T;
}
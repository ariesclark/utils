/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type Constructor <T = any> = new (...args: any) => T;
export type AbstractConstructor <T = any> = abstract new (...args: any) => T;

/**
 * A function that does nothing.
 * @param args Any arguments.
 */
export const noop = (...args: any[]): void => { /* do nothing */ };

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
export function throttle <T extends (...args: any[]) => void> (callback: T, delay: number): T {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return ((...args: Parameters<T>) => {
		if (timer) return;

		timer = setTimeout(() => {
			callback(...args);
			timer = null;
		}, delay);
	}) as unknown as T;
}

/**
 * The debounced function will ignore all calls to it until the
 * calls have stopped for a specified time period. Only then will it call the original function.
 *
 * Debouncing forces a function to wait a certain amount of time before running again.
 * In other words, it limits the rate at which a function gets invoked.

 * @param callback The function the debounce.
 * @param delay Time in milliseconds
 * @returns The debounced function.
 */
export function debounce <T extends (...args: any[]) => void> (callback: T, delay: number): T {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return ((...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			callback(...args);
			timer = null;
		}, delay);
	}) as unknown as T;
}
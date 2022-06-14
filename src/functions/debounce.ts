/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The debounced function will ignore all calls to it until the
 * calls have stopped for a specified time period. Only then will it call the original function.
 *
 * Debouncing forces a function to wait a certain amount of time before running again.
 * In other words, it limits the rate at which a function gets invoked.
 *
 * @param callback The function the debounce.
 * @param delay Time in milliseconds
 * @returns The debounced function.
 */
export function debounce<T extends (...args: Array<any>) => void>(callback: T, delay: number): T {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return ((...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			callback(...args);
			timer = null;
		}, delay);
	}) as unknown as T;
}

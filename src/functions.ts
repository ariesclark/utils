/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type Constructor <T = any> = new (...args: any) => T;
export type AbstractConstructor <T = any> = abstract new (...args: any) => T;

export const noop = (...args: any[]): void => { /* do nothing */ };

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
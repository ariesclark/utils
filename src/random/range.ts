import { float } from "./float";

/**
 * Generate a number within the specified range.
 *
 * @param min The minimum possible value.
 * @param max The maximum possible value.
 */
export function range(min: number, max: number): number {
	return Math.floor(float() * (max - min + 1)) + min;
}

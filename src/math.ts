/**
 * Clamp value to be within the minimum and maximum range.
 * This will round to the nearest boundary if the value is outside of it.
 * 
 * @param value The original value.
 * @param min The minimum possible value.
 * @param max The maximum possible value.
 */
export function clamp (value: number, min: number, max: number) {
	return (value > max ? max : (value < min ? min : value));
}
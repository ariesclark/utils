/**
 * Generate a random number between 0 and 1.
 *
 * Uses ``crypto.getRandomValues`` but falls back to
 * the traditional ``Math.random``.
 */
export function random (): number {
	if (window.crypto) {
		const array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return array[0] / (0xffffffff + 1);
	}

	return Math.random();
}

/**
 * Generate a number within the specified range.
 *
 * @param min The minimum possible value.
 * @param max The maximum possible value.
 */
export function range (min: number, max: number): number {
	return Math.floor(random() * (max - min + 1)) + min;
}


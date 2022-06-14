/**
 * Generate a random number between 0 and 1.
 *
 * Uses ``crypto.getRandomValues`` but falls back to
 * the traditional ``Math.random``.
 */
export function float(): number {
	if (window.crypto) {
		const array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return array[0] / (0xffffffff + 1);
	}

	return Math.random();
}

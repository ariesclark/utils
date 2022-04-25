export async function sha1sum (value: string): Promise<string> {
	const arr = [...new Uint8Array(await crypto.subtle.digest("sha-1", new TextEncoder().encode(value)))];
	return arr.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}
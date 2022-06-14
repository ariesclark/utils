/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "./create";
import { entries } from "./entries";
import { keys } from "./keys";

import type { Expand, UnionToIntersection } from "..";

export type Flatten<T, Z extends string = ""> = T extends object
	? Expand<
			UnionToIntersection<
				{
					[P in keyof T]: P extends string | number
						? T[P] extends object
							? Flatten<T[P], `${Z}${P}.`>
							: { [Q in `${Z}${P}`]: T[P] }
						: never;
				}[keyof T & (T extends ReadonlyArray<unknown> ? number : unknown)]
			>
	  >
	: T;

export type Unflatten<T extends { [key: string]: unknown }> = Expand<
	UnionToIntersection<UnflattenDirect<T> | UnflattenIndirect<T, PrefixKeyof<T>>>
>;

type PrefixKeyof<T extends { [key: string]: unknown }> = {
	[P in keyof T]: P extends `${infer Q}.${string}` ? Q : never;
}[keyof T];

type UnflattenDirect<T extends { [key: string]: unknown }> = {
	[P in keyof T]: P extends `${string}.${string}` ? never : { [Q in P]: T[P] };
}[keyof T];

type UnflattenIndirect<T extends { [key: string]: unknown }, Z extends string> = Z extends Z
	? {
			[P in Z]: Expand<
				UnionToIntersection<
					{
						[P in keyof T]: P extends `${Z}.${infer Affix}`
							? Unflatten<{ [Q in Affix]: T[P] }>
							: never;
					}[keyof T]
				>
			>;
	  }
	: never;

/**
 * Turn an object into a single depth object.
 * @param object The original object.
 */
export function flatten<T>(object: T): Flatten<T> {
	const newObject = create<any>();

	function step(stepObject: any, parentKey?: string | number, depth: number = 0): void {
		for (const [key, value] of entries(stepObject)) {
			if (typeof key === "symbol") continue; // ignore symbols.
			const newKey = parentKey ? `${parentKey}.${key}` : key;

			if (typeof value === "object") {
				return void step(value, newKey, depth + 1);
			}

			newObject[newKey] = value;
		}
	}

	step(object);
	return newObject;
}

/**
 * Revert a flattened object to a nested object.
 * @todo This currently doesn't deal with arrays.
 * @param object The flattened object.
 */
export function unflatten<T extends { [key: string]: unknown }>(object: T): Unflatten<T> {
	const newObject = create<any>();

	for (const key of keys(object)) {
		if (typeof key !== "string") continue;

		const nestedKeys = key.split(".").reverse();
		let receipt = newObject;

		while (nestedKeys.length >= 1) {
			const nestedKey = nestedKeys.pop();
			if (!nestedKey) continue;

			receipt[nestedKey] ??= {};

			if (nestedKeys.length === 0) {
				receipt[nestedKey] = object[key];
				continue;
			}

			receipt = receipt[nestedKey];
		}
	}

	return newObject;
}

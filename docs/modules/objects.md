[@ariesclark/utils](../README.md) / [Exports](../modules.md) / objects

# Namespace: objects

## Table of contents

### Type aliases

- [Cast](objects.md#cast)
- [Entries](objects.md#entries)
- [FilterPredicate](objects.md#filterpredicate)
- [FromEntries](objects.md#fromentries)
- [Keys](objects.md#keys)
- [KeysAssignableToType](objects.md#keysassignabletotype)
- [MapCallback](objects.md#mapcallback)
- [Merge](objects.md#merge)
- [OmitByType](objects.md#omitbytype)

### Functions

- [create](objects.md#create)
- [entries](objects.md#entries)
- [filter](objects.md#filter)
- [fromEntries](objects.md#fromentries)
- [keys](objects.md#keys)
- [map](objects.md#map)
- [omit](objects.md#omit)
- [pick](objects.md#pick)

## Type aliases

### Cast

Ƭ **Cast**<`X`, `Y`\>: `X` extends `Y` ? `X` : `Y`

#### Type parameters

| Name |
| :------ |
| `X` |
| `Y` |

#### Defined in

[objects.ts:3](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L3)

___

### Entries

Ƭ **Entries**<`T`\>: { [K in Keys<T\>]: [K, T[K]] }[[`Keys`](objects.md#keys)<`T`\>][]

Array<[key, value]>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[objects.ts:6](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L6)

___

### FilterPredicate

Ƭ **FilterPredicate**<`T`\>: (`key`: [`Keys`](objects.md#keys)<`T`\>, `value`: `T`[typeof `key`], `object`: `T`) => `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`key`, `value`, `object`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`Keys`](objects.md#keys)<`T`\> |
| `value` | `T`[typeof `key`] |
| `object` | `T` |

##### Returns

`boolean`

#### Defined in

[objects.ts:14](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L14)

___

### FromEntries

Ƭ **FromEntries**<`T`\>: `T` extends [infer Key, `any`][] ? { [K in Cast<Key, PropertyKey\>]: Extract<T[number], [K, any]\>[1] } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[objects.ts:7](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L7)

___

### Keys

Ƭ **Keys**<`T`\>: keyof `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[objects.ts:1](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L1)

___

### KeysAssignableToType

Ƭ **KeysAssignableToType**<`T`, `V`\>: { [K in Keys<T\>]-?: T[K] extends V ? K : never }[[`Keys`](objects.md#keys)<`T`\>]

#### Type parameters

| Name |
| :------ |
| `T` |
| `V` |

#### Defined in

[objects.ts:11](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L11)

___

### MapCallback

Ƭ **MapCallback**<`T`\>: (`key`: [`Keys`](objects.md#keys)<`T`\>, `value`: `T`[typeof `key`], `object`: `T`) => [key: PropertyKey, value: any]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`key`, `value`, `object`): [key: PropertyKey, value: any]

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`Keys`](objects.md#keys)<`T`\> |
| `value` | `T`[typeof `key`] |
| `object` | `T` |

##### Returns

[key: PropertyKey, value: any]

#### Defined in

[objects.ts:15](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L15)

___

### Merge

Ƭ **Merge**<`A`, `B`\>: { [K in Keys<A\> \| Keys<B\>]: A[K & Keys<A\>] \| B[K & Keys<B\>] }

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Defined in

[objects.ts:2](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L2)

___

### OmitByType

Ƭ **OmitByType**<`T`, `V`\>: `Omit`<`T`, [`KeysAssignableToType`](objects.md#keysassignabletotype)<`T`, `V`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `V` |

#### Defined in

[objects.ts:12](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L12)

## Functions

### create

▸ **create**<`T`\>(`object?`): `T`

Create an object without a prototype.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object?` | `Readonly`<`T`\> | The original object. |

#### Returns

`T`

#### Defined in

[objects.ts:44](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L44)

___

### entries

▸ **entries**<`T`\>(`object`): [`Entries`](objects.md#entries)<`T`\>

Returns an array of key/values of the enumerable properties of an object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The original object. |

#### Returns

[`Entries`](objects.md#entries)<`T`\>

#### Defined in

[objects.ts:28](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L28)

___

### filter

▸ **filter**<`T`, `R`\>(`object`, `predicate`): `R`

Remove keys from an object based on a function
predicate without mutating the original.

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `Readonly`<`T`\> | The original object. |
| `predicate` | [`FilterPredicate`](objects.md#filterpredicate)<`T`\> | A predicate function to determine which keys to retain. The filter method calls the predicate function one time for each element in the array. |

#### Returns

`R`

#### Defined in

[objects.ts:56](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L56)

___

### fromEntries

▸ **fromEntries**<`T`\>(`entries`): [`FromEntries`](objects.md#fromentries)<`T`\>

Returns an object created by key-value entries for properties and methods

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entries` | `T` | An iterable object that contains key-value entries for properties and methods. |

#### Returns

[`FromEntries`](objects.md#fromentries)<`T`\>

#### Defined in

[objects.ts:36](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L36)

___

### keys

▸ **keys**<`T`\>(`object`): keyof `T`[]

Returns the names of the enumerable string properties and methods of an object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | The original object. |

#### Returns

keyof `T`[]

#### Defined in

[objects.ts:21](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L21)

___

### map

▸ **map**<`T`, `R`\>(`object`, `callback`): `R`

Transform an object without mutating the original.

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `Readonly`<`T`\> | The original object. |
| `callback` | [`MapCallback`](objects.md#mapcallback)<`T`\> | The map method calls the callback function one time for each element in the array. |

#### Returns

`R`

#### Defined in

[objects.ts:66](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L66)

___

### omit

▸ **omit**<`T`, `K`\>(`object`, `keys`): `Omit`<`T`, `K`[`number`]\>

Remove keys from an object. This function creates a new object
without the specified keys. The original object is not mutated.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `Readonly`<`T`\> | The original object. |
| `keys` | `K` | An array of keys to remove. |

#### Returns

`Omit`<`T`, `K`[`number`]\>

#### Defined in

[objects.ts:91](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L91)

___

### pick

▸ **pick**<`T`, `K`\>(`object`, `keys`): `Pick`<`T`, `K`[`number`]\>

Pick keys from an object. This function creates a new object
with the specified keys. The original object is not mutated.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `Readonly`<`T`\> | The original object. |
| `keys` | `K` | An array of keys to keep. |

#### Returns

`Pick`<`T`, `K`[`number`]\>

#### Defined in

[objects.ts:77](https://github.com/ariesclark/utils/blob/d20b945/src/objects.ts#L77)

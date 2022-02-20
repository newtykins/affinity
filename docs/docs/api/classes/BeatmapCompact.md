---
id: 'BeatmapCompact'
title: 'Class: BeatmapCompact'
sidebar_label: 'BeatmapCompact'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

-   **`BeatmapCompact`**

    ↳ [`Beatmap`](Beatmap.md)

    ↳ [`BeatmapPlaycount`](BeatmapPlaycount.md)

## Constructors

### constructor

• **new BeatmapCompact**(`client`, `data`)

#### Parameters

| Name     | Type                      |
| :------- | :------------------------ |
| `client` | [`Affinity`](Affinity.md) |
| `data`   | `any`                     |

#### Defined in

[src/structures/BeatmapCompact.ts:19](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L19)

## Properties

### beatmapsetId

• **beatmapsetId**: `number`

#### Defined in

[src/structures/BeatmapCompact.ts:12](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L12)

---

### difficultyName

• **difficultyName**: `string`

#### Defined in

[src/structures/BeatmapCompact.ts:17](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L17)

---

### id

• **id**: `number`

#### Defined in

[src/structures/BeatmapCompact.ts:10](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L10)

---

### length

• **length**: `number`

#### Defined in

[src/structures/BeatmapCompact.ts:15](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L15)

---

### mapperId

• **mapperId**: `number`

#### Defined in

[src/structures/BeatmapCompact.ts:16](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L16)

---

### mode

• **mode**: [`Modes`](../namespaces/Affinity.md#modes)

#### Defined in

[src/structures/BeatmapCompact.ts:13](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L13)

---

### starRating

• **starRating**: `number`

#### Defined in

[src/structures/BeatmapCompact.ts:11](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L11)

---

### status

• **status**: [`RankStatus`](../namespaces/BeatmapSet.md#rankstatus)

#### Defined in

[src/structures/BeatmapCompact.ts:14](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L14)

## Accessors

### url

• `get` **url**(): `string`

#### Returns

`string`

#### Defined in

[src/structures/BeatmapCompact.ts:32](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L32)

## Methods

### fetchBeatmapSet

▸ **fetchBeatmapSet**(): `Promise`<[`BeatmapSet`](BeatmapSet.md)\>

Fetch the beatmap set this beatmap belongs to!

**`async`**

#### Returns

`Promise`<[`BeatmapSet`](BeatmapSet.md)\>

#### Defined in

[src/structures/BeatmapCompact.ts:48](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L48)

---

### fetchMapper

▸ **fetchMapper**(`mode?`): `Promise`<[`User`](User.md)\>

Fetch the mapper of the beatmap!

**`async`**

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `mode` | [`Modes`](../namespaces/Affinity.md#modes) |

#### Returns

`Promise`<[`User`](User.md)\>

#### Defined in

[src/structures/BeatmapCompact.ts:40](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L40)

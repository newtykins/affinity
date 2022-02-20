---
id: 'Beatmap'
title: 'Class: Beatmap'
sidebar_label: 'Beatmap'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

-   [`BeatmapCompact`](BeatmapCompact.md)

    ↳ **`Beatmap`**

## Constructors

### constructor

• **new Beatmap**(`client`, `data`)

#### Parameters

| Name     | Type                      |
| :------- | :------------------------ |
| `client` | [`Affinity`](Affinity.md) |
| `data`   | `any`                     |

#### Overrides

[BeatmapCompact](BeatmapCompact.md).[constructor](BeatmapCompact.md#constructor)

#### Defined in

[src/structures/Beatmap.ts:20](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L20)

## Properties

### beatmapsetId

• **beatmapsetId**: `number`

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[beatmapsetId](BeatmapCompact.md#beatmapsetid)

#### Defined in

[src/structures/BeatmapCompact.ts:12](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L12)

---

### bpm

• **bpm**: `number`

#### Defined in

[src/structures/Beatmap.ts:9](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L9)

---

### convert

• **convert**: `boolean`

#### Defined in

[src/structures/Beatmap.ts:10](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L10)

---

### difficultyName

• **difficultyName**: `string`

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[difficultyName](BeatmapCompact.md#difficultyname)

#### Defined in

[src/structures/BeatmapCompact.ts:17](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L17)

---

### difficultyStats

• **difficultyStats**: [`Difficulty`](../interfaces/Beatmap.Difficulty.md)

#### Defined in

[src/structures/Beatmap.ts:8](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L8)

---

### id

• **id**: `number`

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[id](BeatmapCompact.md#id)

#### Defined in

[src/structures/BeatmapCompact.ts:10](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L10)

---

### length

• **length**: `number`

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[length](BeatmapCompact.md#length)

#### Defined in

[src/structures/BeatmapCompact.ts:15](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L15)

---

### mapper

• **mapper**: `string`

The mapper's name at the time of submission - potentially outdated.

#### Defined in

[src/structures/Beatmap.ts:18](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L18)

---

### mapperId

• **mapperId**: `number`

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[mapperId](BeatmapCompact.md#mapperid)

#### Defined in

[src/structures/BeatmapCompact.ts:16](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L16)

---

### maxCombo

• **maxCombo**: `number`

#### Defined in

[src/structures/Beatmap.ts:7](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L7)

---

### mode

• **mode**: [`Modes`](../namespaces/Affinity.md#modes)

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[mode](BeatmapCompact.md#mode)

#### Defined in

[src/structures/BeatmapCompact.ts:13](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L13)

---

### objectCounts

• **objectCounts**: [`ObjectCounts`](../interfaces/Beatmap.ObjectCounts.md)

#### Defined in

[src/structures/Beatmap.ts:11](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L11)

---

### passCount

• **passCount**: `number`

#### Defined in

[src/structures/Beatmap.ts:12](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L12)

---

### playCount

• **playCount**: `number`

#### Defined in

[src/structures/Beatmap.ts:13](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L13)

---

### rawData

• **rawData**: `any`

#### Defined in

[src/structures/Beatmap.ts:5](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Beatmap.ts#L5)

---

### starRating

• **starRating**: `number`

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[starRating](BeatmapCompact.md#starrating)

#### Defined in

[src/structures/BeatmapCompact.ts:11](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L11)

---

### status

• **status**: [`RankStatus`](../namespaces/BeatmapSet.md#rankstatus)

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[status](BeatmapCompact.md#status)

#### Defined in

[src/structures/BeatmapCompact.ts:14](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L14)

## Accessors

### url

• `get` **url**(): `string`

#### Returns

`string`

#### Inherited from

BeatmapCompact.url

#### Defined in

[src/structures/BeatmapCompact.ts:32](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L32)

## Methods

### fetchBeatmapSet

▸ **fetchBeatmapSet**(): `Promise`<[`BeatmapSet`](BeatmapSet.md)\>

Fetch the beatmap set this beatmap belongs to!

**`async`**

#### Returns

`Promise`<[`BeatmapSet`](BeatmapSet.md)\>

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[fetchBeatmapSet](BeatmapCompact.md#fetchbeatmapset)

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

#### Inherited from

[BeatmapCompact](BeatmapCompact.md).[fetchMapper](BeatmapCompact.md#fetchmapper)

#### Defined in

[src/structures/BeatmapCompact.ts:40](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapCompact.ts#L40)

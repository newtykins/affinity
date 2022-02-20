---
id: 'BeatmapSet'
title: 'Class: BeatmapSet'
sidebar_label: 'BeatmapSet'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new BeatmapSet**(`client`, `config`, `data`)

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `client` | [`Affinity`](Affinity.md)                    |
| `config` | [`Config`](../interfaces/Affinity.Config.md) |
| `data`   | `any`                                        |

#### Defined in

[src/structures/BeatmapSet.ts:35](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L35)

## Properties

### artist

• **artist**: `string`

#### Defined in

[src/structures/BeatmapSet.ts:12](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L12)

---

### artistUnicode

• **artistUnicode**: `string`

#### Defined in

[src/structures/BeatmapSet.ts:13](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L13)

---

### beatmaps

• **beatmaps**: [`Beatmap`](Beatmap.md)[]

#### Defined in

[src/structures/BeatmapSet.ts:26](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L26)

---

### bpm

• **bpm**: `number`

#### Defined in

[src/structures/BeatmapSet.ts:21](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L21)

---

### covers

• **covers**: [`Covers`](../interfaces/BeatmapSet.Covers.md)

#### Defined in

[src/structures/BeatmapSet.ts:16](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L16)

---

### genre

• **genre**: [`Genre`](../namespaces/BeatmapSet.md#genre)

#### Defined in

[src/structures/BeatmapSet.ts:27](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L27)

---

### id

• **id**: `number`

#### Defined in

[src/structures/BeatmapSet.ts:11](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L11)

---

### lastUpdated

• **lastUpdated**: `Date`

#### Defined in

[src/structures/BeatmapSet.ts:22](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L22)

---

### mapper

• **mapper**: `string`

The mapper's name at the time of the set's submission - potentially outdated.

#### Defined in

[src/structures/BeatmapSet.ts:32](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L32)

---

### mapperId

• **mapperId**: `number`

#### Defined in

[src/structures/BeatmapSet.ts:33](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L33)

---

### nsfw

• **nsfw**: `boolean`

#### Defined in

[src/structures/BeatmapSet.ts:17](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L17)

---

### playCount

• **playCount**: `number`

#### Defined in

[src/structures/BeatmapSet.ts:18](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L18)

---

### preview

• **preview**: `string`

#### Defined in

[src/structures/BeatmapSet.ts:19](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L19)

---

### rankedDate

• **rankedDate**: `Date`

#### Defined in

[src/structures/BeatmapSet.ts:23](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L23)

---

### rawData

• **rawData**: `any`

#### Defined in

[src/structures/BeatmapSet.ts:7](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L7)

---

### status

• **status**: [`RankStatus`](../namespaces/BeatmapSet.md#rankstatus)

#### Defined in

[src/structures/BeatmapSet.ts:20](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L20)

---

### submittedDate

• **submittedDate**: `Date`

#### Defined in

[src/structures/BeatmapSet.ts:24](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L24)

---

### tags

• **tags**: `string`[]

#### Defined in

[src/structures/BeatmapSet.ts:25](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L25)

---

### title

• **title**: `string`

#### Defined in

[src/structures/BeatmapSet.ts:14](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L14)

---

### titleUnicode

• **titleUnicode**: `string`

#### Defined in

[src/structures/BeatmapSet.ts:15](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L15)

## Accessors

### url

• `get` **url**(): `string`

#### Returns

`string`

#### Defined in

[src/structures/BeatmapSet.ts:81](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L81)

## Methods

### fetchMapper

▸ **fetchMapper**(`mode?`): `Promise`<[`User`](User.md)\>

Fetch the mapper of the beatmap set!

**`async`**

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `mode` | [`Modes`](../namespaces/Affinity.md#modes) |

#### Returns

`Promise`<[`User`](User.md)\>

#### Defined in

[src/structures/BeatmapSet.ts:89](https://github.com/newtykins/affinity/blob/37745b2/src/structures/BeatmapSet.ts#L89)

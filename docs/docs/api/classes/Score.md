---
id: 'Score'
title: 'Class: Score'
sidebar_label: 'Score'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Score**(`client`, `config`, `data`)

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `client` | [`Affinity`](Affinity.md)                    |
| `config` | [`Config`](../interfaces/Affinity.Config.md) |
| `data`   | `any`                                        |

#### Defined in

[src/structures/Score.ts:30](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L30)

## Properties

### accuracy

• **accuracy**: `number`

#### Defined in

[src/structures/Score.ts:15](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L15)

---

### beatmapId

• **beatmapId**: `number`

#### Defined in

[src/structures/Score.ts:27](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L27)

---

### beatmapSetId

• **beatmapSetId**: `number`

#### Defined in

[src/structures/Score.ts:28](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L28)

---

### createdAt

• **createdAt**: `Date`

#### Defined in

[src/structures/Score.ts:23](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L23)

---

### hasReplay

• **hasReplay**: `boolean`

#### Defined in

[src/structures/Score.ts:26](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L26)

---

### hits

• **hits**: [`Hits`](../interfaces/Score.Hits.md)

#### Defined in

[src/structures/Score.ts:21](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L21)

---

### id

• **id**: `number`

#### Defined in

[src/structures/Score.ts:13](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L13)

---

### maximumCombo

• **maximumCombo**: `string`

#### Defined in

[src/structures/Score.ts:18](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L18)

---

### mode

• **mode**: [`Modes`](../namespaces/Affinity.md#modes)

#### Defined in

[src/structures/Score.ts:25](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L25)

---

### mods

• **mods**: `string`[]

#### Defined in

[src/structures/Score.ts:16](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L16)

---

### passed

• **passed**: `boolean`

#### Defined in

[src/structures/Score.ts:19](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L19)

---

### perfect

• **perfect**: `boolean`

#### Defined in

[src/structures/Score.ts:20](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L20)

---

### pp

• **pp**: `number`

#### Defined in

[src/structures/Score.ts:24](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L24)

---

### rank

• **rank**: `string`

#### Defined in

[src/structures/Score.ts:22](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L22)

---

### rawData

• **rawData**: `any`

#### Defined in

[src/structures/Score.ts:9](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L9)

---

### score

• **score**: `number`

#### Defined in

[src/structures/Score.ts:17](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L17)

---

### userId

• **userId**: `number`

#### Defined in

[src/structures/Score.ts:14](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L14)

## Accessors

### url

• `get` **url**(): `string`

#### Returns

`string`

#### Defined in

[src/structures/Score.ts:65](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L65)

## Methods

### fetchBeatmap

▸ **fetchBeatmap**(): `Promise`<[`Beatmap`](Beatmap.md)\>

Fetch the beatmap this score was set on!

**`async`**

#### Returns

`Promise`<[`Beatmap`](Beatmap.md)\>

#### Defined in

[src/structures/Score.ts:83](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L83)

---

### fetchBeatmapSet

▸ **fetchBeatmapSet**(): `Promise`<[`BeatmapSet`](BeatmapSet.md)\>

Fetch the beatmap set of the beatmap this score was set on!

**`async`**

#### Returns

`Promise`<[`BeatmapSet`](BeatmapSet.md)\>

#### Defined in

[src/structures/Score.ts:91](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L91)

---

### fetchUser

▸ **fetchUser**(`mode?`): `Promise`<[`User`](User.md)\>

Fetch the user associated with this score!

**`async`**

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `mode` | [`Modes`](../namespaces/Affinity.md#modes) |

#### Returns

`Promise`<[`User`](User.md)\>

#### Defined in

[src/structures/Score.ts:73](https://github.com/newtykins/affinity/blob/37745b2/src/structures/Score.ts#L73)

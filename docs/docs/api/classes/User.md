---
id: 'User'
title: 'Class: User'
sidebar_label: 'User'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new User**(`client`, `token`, `mode`, `data`)

#### Parameters

| Name     | Type                                       |
| :------- | :----------------------------------------- |
| `client` | [`Affinity`](Affinity.md)                  |
| `token`  | `string`                                   |
| `mode`   | [`Modes`](../namespaces/Affinity.md#modes) |
| `data`   | `any`                                      |

#### Defined in

[src/structures/User.ts:35](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L35)

## Properties

### achievements

• **achievements**: [`Achievement`](../interfaces/User.Achievement.md)[]

#### Defined in

[src/structures/User.ts:25](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L25)

---

### avatar

• **avatar**: `string`

#### Defined in

[src/structures/User.ts:16](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L16)

---

### badges

• **badges**: [`Badge`](../interfaces/User.Badge.md)[]

#### Defined in

[src/structures/User.ts:23](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L23)

---

### country

• **country**: [`Country`](../interfaces/User.Country.md)

#### Defined in

[src/structures/User.ts:21](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L21)

---

### coverUrl

• **coverUrl**: `string`

#### Defined in

[src/structures/User.ts:17](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L17)

---

### currentSupporter

• **currentSupporter**: `boolean`

#### Defined in

[src/structures/User.ts:31](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L31)

---

### hasSupported

• **hasSupported**: `boolean`

#### Defined in

[src/structures/User.ts:32](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L32)

---

### id

• **id**: `number`

#### Defined in

[src/structures/User.ts:14](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L14)

---

### isActive

• **isActive**: `boolean`

#### Defined in

[src/structures/User.ts:28](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L28)

---

### isBot

• **isBot**: `boolean`

#### Defined in

[src/structures/User.ts:29](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L29)

---

### isOnline

• **isOnline**: `boolean`

#### Defined in

[src/structures/User.ts:30](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L30)

---

### joinDate

• **joinDate**: `Date`

#### Defined in

[src/structures/User.ts:18](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L18)

---

### kudosu

• **kudosu**: [`Kudosu`](../interfaces/User.Kudosu.md)

#### Defined in

[src/structures/User.ts:19](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L19)

---

### playcounts

• **playcounts**: [`Playcount`](../interfaces/User.Playcount.md)[]

#### Defined in

[src/structures/User.ts:24](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L24)

---

### playstyles

• **playstyles**: [`Playstyle`](../namespaces/User.md#playstyle)[]

#### Defined in

[src/structures/User.ts:33](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L33)

---

### previousUsernames

• **previousUsernames**: `string`[]

#### Defined in

[src/structures/User.ts:27](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L27)

---

### profile

• **profile**: [`Profile`](../interfaces/User.Profile.md)

#### Defined in

[src/structures/User.ts:20](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L20)

---

### rankHistory

• **rankHistory**: [`RankHistory`](../interfaces/User.RankHistory.md)

#### Defined in

[src/structures/User.ts:26](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L26)

---

### rawData

• **rawData**: `any`

#### Defined in

[src/structures/User.ts:9](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L9)

---

### statistics

• **statistics**: [`Statistics`](../interfaces/User.Statistics.md)

#### Defined in

[src/structures/User.ts:22](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L22)

---

### username

• **username**: `string`

#### Defined in

[src/structures/User.ts:15](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L15)

## Accessors

### url

• `get` **url**(): `string`

#### Returns

`string`

#### Defined in

[src/structures/User.ts:110](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L110)

## Methods

### fetchBeatmaps

▸ **fetchBeatmaps**<`T`\>(`type?`): `Promise`<`T` extends `"most_played"` ? [`BeatmapPlaycount`](BeatmapPlaycount.md)[] : [`BeatmapSet`](BeatmapSet.md)[]\>

Fetch beatmaps relating to this user!

**`async`**

#### Type parameters

| Name | Type                                                                         |
| :--- | :--------------------------------------------------------------------------- |
| `T`  | extends [`BeatmapTypes`](../namespaces/User.md#beatmaptypes) = `"favourite"` |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `type?` | `T`  |

#### Returns

`Promise`<`T` extends `"most_played"` ? [`BeatmapPlaycount`](BeatmapPlaycount.md)[] : [`BeatmapSet`](BeatmapSet.md)[]\>

#### Defined in

[src/structures/User.ts:131](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L131)

---

### fetchScores

▸ **fetchScores**(`options?`): `Promise`<[`Score`](Score.md)[]\>

Fetch scores associated with this user!

**`async`**

#### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `options` | [`UserScores`](../interfaces/Affinity.Options.UserScores.md) |

#### Returns

`Promise`<[`Score`](Score.md)[]\>

#### Defined in

[src/structures/User.ts:118](https://github.com/newtykins/affinity/blob/37745b2/src/structures/User.ts#L118)

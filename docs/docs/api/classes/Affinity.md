---
id: 'Affinity'
title: 'Class: Affinity'
sidebar_label: 'Affinity'
sidebar_position: 0
custom_edit_url: null
---

The Affinity client!

## Constructors

### constructor

• **new Affinity**(`clientId`, `clientSecret`, `config?`)

#### Parameters

| Name           | Type                                         |
| :------------- | :------------------------------------------- |
| `clientId`     | `number`                                     |
| `clientSecret` | `string`                                     |
| `config?`      | [`Config`](../interfaces/Affinity.Config.md) |

#### Defined in

[src/Affinity.ts:28](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L28)

## Accessors

### loggedIn

• `get` **loggedIn**(): `boolean`

Is the client currently logged in?

#### Returns

`boolean`

#### Defined in

[src/Affinity.ts:55](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L55)

## Methods

### getBeatmap

▸ **getBeatmap**(`id`): `Promise`<[`Beatmap`](Beatmap.md)\>

Fetch a beatmap by its ID!

**`async`**

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `number` |

#### Returns

`Promise`<[`Beatmap`](Beatmap.md)\>

#### Defined in

[src/Affinity.ts:183](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L183)

---

### getBeatmapSet

▸ **getBeatmapSet**(`id`): `Promise`<[`BeatmapSet`](BeatmapSet.md)\>

Fetch a beatmap set by its ID!

**`async`**

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `number` |

#### Returns

`Promise`<[`BeatmapSet`](BeatmapSet.md)\>

#### Defined in

[src/Affinity.ts:202](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L202)

---

### getUser

▸ **getUser**(`query`, `mode?`): `Promise`<[`User`](User.md)\>

Fetch a user by their username or ID!

**`async`**

#### Parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `query` | `string` \| `number`                       |
| `mode`  | [`Modes`](../namespaces/Affinity.md#modes) |

#### Returns

`Promise`<[`User`](User.md)\>

#### Defined in

[src/Affinity.ts:118](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L118)

---

### getUserScores

▸ **getUserScores**(`id`, `options?`): `Promise`<[`Score`](Score.md)[]\>

Fetch a user's scores using their ID!

**`async`**

#### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `id`      | `number`                                                     |
| `options` | [`UserScores`](../interfaces/Affinity.Options.UserScores.md) |

#### Returns

`Promise`<[`Score`](Score.md)[]\>

#### Defined in

[src/Affinity.ts:142](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L142)

---

### searchBeatmapSets

▸ **searchBeatmapSets**(`query`, `options?`): `Promise`<[`BeatmapSet`](BeatmapSet.md)[]\>

Search beatmap sets with a query - returns a list of search results

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `query`   | `string`                                                                   |
| `options` | [`SearchBeatmapSets`](../interfaces/Affinity.Options.SearchBeatmapSets.md) |

#### Returns

`Promise`<[`BeatmapSet`](BeatmapSet.md)[]\>

#### Defined in

[src/Affinity.ts:220](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L220)

---

### updateConfig

▸ **updateConfig**(`config`): [`Affinity`](Affinity.md)

Update config on the client!

#### Parameters

| Name     | Type                                                     |
| :------- | :------------------------------------------------------- |
| `config` | `Partial`<[`Config`](../interfaces/Affinity.Config.md)\> |

#### Returns

[`Affinity`](Affinity.md)

#### Defined in

[src/Affinity.ts:106](https://github.com/newtykins/affinity/blob/37745b2/src/Affinity.ts#L106)

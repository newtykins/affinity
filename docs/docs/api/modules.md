---
id: 'modules'
title: 'docs'
sidebar_label: 'Exports'
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

-   [Affinity](namespaces/Affinity.md)
-   [Beatmap](namespaces/Beatmap.md)
-   [BeatmapSet](namespaces/BeatmapSet.md)
-   [Score](namespaces/Score.md)
-   [User](namespaces/User.md)

## Classes

-   [Affinity](classes/Affinity.md)
-   [Beatmap](classes/Beatmap.md)
-   [BeatmapCompact](classes/BeatmapCompact.md)
-   [BeatmapPlaycount](classes/BeatmapPlaycount.md)
-   [BeatmapSet](classes/BeatmapSet.md)
-   [Score](classes/Score.md)
-   [User](classes/User.md)

## Properties

### links

• **links**: `Links`

---

### mods

• **mods**: `Mods`

## Functions

### calculateAccuracy

▸ **calculateAccuracy**<`M`\>(`mode`, `data`): `number`

#### Type parameters

| Name | Type                                            |
| :--- | :---------------------------------------------- |
| `M`  | extends [`Modes`](namespaces/Affinity.md#modes) |

#### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `mode` | `M`                  |
| `data` | `AccuracyData`<`M`\> |

#### Returns

`number`

#### Defined in

[src/helpers/calculateAccuracy.ts:19](https://github.com/newtykins/affinity/blob/37745b2/src/helpers/calculateAccuracy.ts#L19)

---

### calculateStdPp

▸ **calculateStdPp**(`beatmapId`, `stats?`): `Promise`<`PPResult`\>

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `beatmapId` | `number`  |
| `stats?`    | `PPStats` |

#### Returns

`Promise`<`PPResult`\>

#### Defined in

[src/helpers/calculateStdPp.ts:40](https://github.com/newtykins/affinity/blob/37745b2/src/helpers/calculateStdPp.ts#L40)

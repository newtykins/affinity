---
sidebar_position: 2
title: Authentication
---

# How do you authenticate Affinity?

In order to authenticate, you must provide the Affinity client with an "Authentication Strategy". This is just a fancy way of saying providing the details that you would like to give to Affinity to do its job.

Currently, there are two available authentication strategies. In this article, we will be discussing them, the differences, and some best practices along the way.

## Client Strategy

This is the most common authentication strategy, and likely the one you are going to want to use. This takes the details of an OAuth Client as its parameters - namely the client ID and the client secret.

```ts
import Affinity, { ClientAuth } from 'affinityosu';

// client id, client secret
// highlight-start
const authStrategy = new ClientAuth(1234, 'client-secret');
// highlight-end
const client = new Affinity(authStrategy);
```

On the highlighted line above you can see an instance of the client auth strategy being initialised and passed into the Affinity client - this allows Affinity to authenticate itself and automatically refresh its access token when necessary.

Something to note about the client strategy is that it offers a more limited, yet still rich, set of features for the Affinity client compared to strategies like the user strategy. However, for most use cases, this is all that is necessary.

## User Strategy

While the client strategy is fine for most use cases, sometimes you will want access to more advanced features than the client auth strategy can offer - this is where the user strategy comes in. It takes the username and password of an osu! account as its parameters, and makes requests as that user. This allows for more advanced functionality like the downloading of top scores in leaderboards, amongst other things.

```ts
import Affinity, { UserAuth } from 'affinityosu';

// username, password
// highlight-start
const authStrategy = new UserAuth('username', 'password');
// highlight-end
const client = new Affinity(authStrategy);
```

## Best Practices

### There is a short hand!

Every authentication strategy has its own static property on the Affinity client, so instead of having to import one manually you can just make use of that property! Here is an example of how you may authenticate using the client auth strategy in this way:

```ts
import Affinity from 'affinityosu';

// client id, client secret
const client = new Affinity(new Affinity.ClientAuth(1234, 'client-secret'));
```

See! Much simpler (:

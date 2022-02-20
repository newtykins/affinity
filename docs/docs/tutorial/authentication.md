---
sidebar_position: 1
title: Authenticating Affinity
---

Authenticating Affinity is simple! First you must create an OAuth client on your [account settings page](https://osu.ppy.sh/home/account/edit) on the osu! website. Please note down the Client ID and Client Secret values, as these will be useful in a moment.

Now that we have gotten our client registered, we can start coding!

```ts title="/src/index.ts"
import Affinity from 'affinity-osu';

const client = new Affinity(1234, 'your-super-secret-client-secret');
// highlight-start
console.log(client.loggedIn); // false
// highlight-end
```

It may appear as though the client is not currently authenticated, which is true. However, all we have to do authenticate is attempt to make a request to the API.

```ts title="/src/index.ts"
const user = await client.getUser(16009610);
console.log(user.username); // Newt x3
```

The reason this is the case is because the osu! API doesn't take the Client ID and Client Secret values to authenticate a request, it instead asks for an access token which you can recieve using those details. Instead of wastefully making the request for an access token (which will later expire) where it doesn't need to, Affinity waits for the first request to be made before fetching an access token. When that token expires, the .loggedIn attribute on the client will once again become false and a new access token will be fetched on the next request.

Now that we are authenticated, let's get onto making something special with Affinity (:

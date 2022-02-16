---
sidebar_position: 1
title: Parsing Data
---

# How does Affinity parse data?

Affinity makes a request to the osu! API using [axios](https://axios-http.com/), and makes use of its [interceptors](https://axios-http.com/docs/interceptors) feature. The interceptor that Affinity uses simply makes every key in the resultant data [camelCase](https://en.wikipedia.org/wiki/Camel_case) rather than [snake_case](https://en.wikipedia.org/wiki/Snake_case).

## Why is that necessary?

It really is not necessary, however I really do not like the look of snake casing in my code, and as a result I wrote this little interceptor. I may remove it in the future, but for now it is here to say.

## Why does this matter?

To someone using Affinity, this will only ever matter if you want to access the `rawData` property on an object, as unlike the examples on the official [osu! api documentation](https://osu.ppy.sh/docs/index.html), all of the response properties will be camel cased rather than snake cased - it is just something to keep in mind (:

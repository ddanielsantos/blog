---
draft: true
title: "load balancing"
description: "A small note on what is load balancing"
date: "18 Oct, 2023"
tags: ["system-design"]
signature: CzfALTCMrLnYSGLFCTGpaJmeLs/29HlRYqD9XcF6wqhRTP+k3mwSzckR4A6J+4Ljp8aRwO/bTjnQhYEqgYJvCw==
---

![traffic guard](https://media.giphy.com/media/3o6Zt7GpxX0bBvRDgs/giphy.gif)

When your traffic grows, it's common to take the [horizontal scaling](https://www.ddaniel.me/blog/scaling#horizontally) strategy, but with many servers running your business, how to distribute the incoming load? that's when load balancers come in handy.

A load balancer it's a piece of the system design that's responsible for directing tasks between computational resources, just like the image below:

![load balancing 2023-10-18 23 01 16 excalidraw](https://github.com/ddanielsantos/blog/assets/80872981/67451d9b-df14-466a-9636-db23aec7f785)


The new load will first hit the load balancer, which will choose a processing unit to forward it, many different algorithms can be used by a load balancer to determine which processing unit will receive the next load, these are the most common algorithms:

- round robin
- weighted round robin
- least connections
- resourced based

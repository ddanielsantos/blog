---
draft: false
title: "what is a webhook"
description: "Small note about what is a Webhook and how it works"
date: "03 Jun, 2023"
tags: ["http"]
---

let's imagine a crowded restaurant, the waiter's mission is to deliver customer's orders to the kitchen, and when the food is ready, take it to them.

the waiter needs to know when the food is ready, if he goes to the kitchen every 2 minutes to see if an order is ready, it would be a huge waste of time: maybe new customers will enter the restaurant in the meantime. Waiting to be served is never good!

wouldn't it be amazing if the kitchen called the waiter when the order was ready? That way, the waiter would spend less time going to the kitchen and more time doing what matters.

a similar scenario happens when you're choosing an approach to handle real time data coming from external sources, such as an application that you don't have control over. You can call it many times at a given interval (pooling), or await for an event to be sent from source to your application (webhook).

webhook is a common feature on products that heavily depends on integrations, like payment services providers, monitoring systems, CI/CD stuff and so on.

![webhook](https://github.com/user-attachments/assets/8d0c0c32-ba21-44b1-9be6-a281a46e1e16)


this is how a webhook works, as simple as adding an endpoint to your application that listens to POST calls and reporting its address to the application where the events occur. Despite being simple, the possibilities from there are countless, providing a powerful integration.

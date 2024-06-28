---
title: "i wrote a lil version of the tree command"
description: "A small note on a low-key implementation of the UNIX `tree` command in Rust."
date: "18 Sep, 2023"
tags: ["rust", "unix"]
---

A low-key implementation of the UNIX `tree` command in Rust.

> link to the repository: [trii](https://github.com/ddanielsantos/tri)

`trrii` is a small program made to be a small version of the well know UNIX's `tree` command, I wrote it last Sunday and I'm pretty happy with the results, it is currently available at [crates.io](https://crates.io/crates/trii).

obviously, it isn't a 1:1 mapping of `tree` features, since I only wrote it to exercise a little about Rust, it can receive a path and print the file structure with the correct children, unfortunately, it struggles a little with the formatting, and at the moment, can't ignore paths ignored by git.

anyways, I'm pretty happy with the result, if anyone wants to contribute a learn too, here are some improvements that can be done right now:

- ignore paths listed on `.gitignore`
- fix formatting of the last entry
- check performance against a big repository

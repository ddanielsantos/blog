---
title: "Scheduling tasks with PowerShell"
description: "Or how to automate awfully boring tasks"
date: "07 Feb, 2023"
tags: ["TIL", "automation", "powershell"]
---

Doing the same thing over and over again is boring. Thanks to scripting, we can automate this kind of job and save a good amount of time (and patience). In this post, I'll show you how to do this with PowerShell and Windows Task Scheduler.

First you'll need a script, a set of commands that will do the job for you, in my case, I was trying to send some files from my job's PC to my cellphone, I was doing this everyday and I used to get annoyed by the fact that I had to do it manually. So I decided to automate this task.

To do this, I ~searched~ [_cc sseraphined_](https://twitter.com/renat0sp/status/1622682381613207558) some ways to copy files with PowerShell, unfortunately, I had some problems with xcopy, so I moved to adb, which is a tool to interact with Android devices.

adb has this command to copy files:

```sh
adb push $source $dest
```

So I created a file named copy_with_adb.ps1 with the command above and saved it in some random folder.

## Task Scheduler

Now here's where the magic happens, we'll use Windows Task Scheduler to run our script at especific conditions:

![Task Scheduler from Start Menu](https://user-images.githubusercontent.com/80872981/218280898-798cdaac-5e6b-43a8-aaac-a9ca6e9dabea.png)

_^ is in portuguese but you get it_

And that was what I learned today.

- [a](https://twitter.com/renat0sp/)
- [a](https://twitter.com/renat0sp/)

[a](https://twitter.com/renat0sp/)

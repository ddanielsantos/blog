---
title: "A love letter to early return"
description: "Embrace early return"
date: "17 Jun, 2023"
tags: ["refactoring", "basics"]
---

It's all fun and games with if statements until someone have to maintain code like this:

![early-return(1)](https://github.com/ddanielsantos/blog/assets/80872981/27c2a8da-76ef-400c-ae1b-28698926c6a1)

Someone that codes like this is one step away of beating old people. If you're a good person and don't want to look like a maniac, please embrace early return. It's not some advanced technique nor require you to read three Martin Fowler books, it's one of the most easy refactorings and will save you a good amount of sanity.

With early return, instead of going down the rabbit hole of conditionals, you exit the execution wherever a condition isn't met.

Let's check a small example:

In the first iteration we have the worst code possible:

```rs
if a {
    if b {
        if c {
            if d {
                // do things
                return;
            } else if e {
                // do things 2
                return;
            } else {
                // do things 3
                return;
            }
        } else {
            // do things 4
            return;
        }
    }
}
```

From here we can start killing else statements:

```rs
if a {
    if b {
        if c {
            if d {
                // do things
                return;
            }

            if e {
                // do things 2
                return;
            }

            // do things 3
            return;
        }
        // do things 4
    }
}
```

After this, we can merge some conditions:

```rs
if a && b {
    if c {
        if d {
            // do things
            return;
        }

        if e {
            // do things 2
            return;
        }

        // do things 3
        return;
    }
    // do things 4
}
```

If we invert `if c`, we can `do things 4` earlier:

```rs
if a && b {
    if !c {
        // do things 4
        return;
    }

    if d {
        // do things
        return;
    }

    if e {
        // do things 2
        return;
    }

    // do things 3
    return;
}
```

All conditions depends on a and b being true, we can also kill another nesting by doing this:

```rs
if !a || !b {
    return;
}

if !c {
    // do things 4
    return;
}

if d {
    // do things
    return;
}

if e {
    // do things 2
    return;
}

// do things 3
return;
```

And that's it! Now we have a more readable code to handle.

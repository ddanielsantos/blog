---
draft: true
title: "the astro-deck's CLI"
description: "CLIs have always been an efficient way to provide powerful functionality."
date: "09 Aug, 2023"
tags: ["side-project", "astro"]
signature: mpN7B1gqFCJ2Q0ksVh1BF2ltprL/iA8eiZsx34M8G4nEB2PLv23vGbnXDywyz0Z3tR7Usu8YZ1q/QCvSwQPCBA==
---

Last month I wrote about the [beginning of astro-deck](./i-started-astro-deck), a couple things happened since then, and today I want to talk about its CLI.

I didn't know right from the beginning how to distribute astro-deck, I was just building some functionalities on top of Astro, and hoping to someday find out a better way to organize it.

At its early days, astro-deck was nothing more than scripts inside ``package.json`` that just pointed to astro CLI commands:

```json
"scripts": {
	"deck": "tsx src/scripts/deck.ts",
	"dev": "astro dev",
	"build": "astro build",
	"preview": "astro preview",
}
```

Everything was working fine, but I was testing the wrong way, I was creating a deck file inside the project and running these npm script. This is not the way users interact with tools like astro, nextjs and etc, they interact directly with a CLI.

![drawing of a stick figure, pointing to the astro's CLI, in the image, the stick figure asks: "What is astro?"](https://cdn.discordapp.com/attachments/1048420478685028392/1138972243234390046/realizing.excalidraw.png)

*yeah, that was literally me remembering that I interact with CLIs everyday*

I read a little about CLIs, it really is a fascinating world, here are some links that helped me a lot:

- [astro cli](https://github.com/withastro/astro/tree/25e04a2ecbda7952a68220ce6739ae1c75144858/packages/astro/src/cli)
- [contentful cli](https://github.com/contentful/contentful-cli)
- [logrocket's post about CLIs with Node](https://blog.logrocket.com/building-typescript-cli-node-js-commander/)

I ended up choosing NodeJS + [yargs](yargs.js.org/) to build the CLI, there is a lot of content on the internet about them, and the short time I used it, it seemed like a good combo.
## let's get to work

I started with the simplest, the `deck` command, as you saw in the first snippet, its only mission was to call a function inside `src/scripts`, I changed this script location and made some adjustments, here's the final version of the ``deck`` command:

```ts
const command: CommandModule<{}, { path: string }> = {
	command: "deck <path>",
	describe: "Build a presentation from a given .mdx file",
	builder: {
		path: {
			describe: "Path to the .mdx file",
		},
	},

	handler: function (args) {
		const astroDeckPagesFolder = resolve(
			__dirname,
			"..",
			"..",
			"..",
			"src",
			"pages",
		);

		try {
			const filePath = resolve(args.path);
			mdxToPresentation(filePath, astroDeckPagesFolder);
		} catch (error) {
			console.error(`[astro-deck] error: ${(error as Error).message}`);
		}
	},
};
```

It receives a .mdx file, divides it into several other files, and saves everything in the pages folder.

The next one was the `dev` command, all it needs to do is to start Astro development server. As I'm writing this, Astro does not provide a way to start it programatically, so the only option is to start a new process the old way. NodeJS has `child_process` to make this possible, but I choose [``execa``](https://github.com/sindresorhus/execa) since it provides a better API.

My first attempt looked like this:

```ts
await execa("astro", [astroOptions, ...astroCommands.map(toString)], {
	stdio: "inherit"
});
```

Everything sounds ok, but it doesn't work!

![A white board with a joke about how the previous code snippet didn't work](https://cdn.discordapp.com/attachments/1048420478685028392/1138972288016994424/prefer-local-false.excalidraw.png)

This problem happens because the user does not have Astro installed globally/as a dependency.

I also tried [``npm explore``](https://docs.npmjs.com/cli/v9/commands/npm-explore?v=true) as you can see [here](https://twitter.com/renat0sp/status/1685490115781574656?s=20).

It worked but I wanted to know if there's a better way to do this, to my surprise, execa has an awesome option called [``preferLocal``](https://github.com/sindresorhus/execa#preferlocal), if set to true, it will look first for locally installed binaries.

```ts
await execa("astro", [astroOptions, ...astroCommands.map(toString)], {
	stdio: "inherit",
	cwd: astroDeckFolder,
	preferLocal: true,
});
```

And then:

![A white board with a joke about the previous code snippet](https://cdn.discordapp.com/attachments/1048420478685028392/1138972271441092618/prefer-local-true.excalidraw.png)

This is the final version of the astro helper:

```ts
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import type { ArgumentsCamelCase } from "yargs";

export type AstroOptions = "dev" | "build" | "preview";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Runs the Astro CLI with the given options and commands
 */
export async function astro(
	args: ArgumentsCamelCase,
	astroOptions: AstroOptions,
) {
	const astroCommands = args._.slice(1);

	const astroDeckFolder = resolve(__dirname, "..", "..");

	await execa("astro", [astroOptions, ...astroCommands.map(toString)], {
		stdio: "inherit",
		cwd: astroDeckFolder,
		preferLocal: true,
	});
}
```

Once the development server starts, it will run the deck command under the hood and listen to any changes inside the `/pages` folder, thanks to the [``deckWatcher``](https://github.com/ddanielsantos/astro-deck/blob/9b532b49dd48275a6171968bd123342511051976/src/cli/deck-watcher.ts) helper, the `dev` command will also listen to changes in the presentation file, and run the deck command again, if needed.

There isn't too much to talk about [`build`](https://github.com/ddanielsantos/astro-deck/blob/9b532b49dd48275a6171968bd123342511051976/src/cli/cmd/build.ts) and [`preview`](https://github.com/ddanielsantos/astro-deck/pull/51/files) commands, they just move folders around and call Astro.

## wrapping up

The CLI will be the bridge between the users and the functionalities of astro-deck, for now, I think it is well organized and can do the job, but remember, this is a open-source project, so suggestions and contributions are always welcome, feel free to [open a issue](https://github.com/ddanielsantos/astro-deck) or to tag me at [Twitter](https://twitter.com/renat0sp).

The next steps of astro-deck will be related to improve the support of default components and themes, they will be hard tasks, and I hope to share more about them as soon as possible.

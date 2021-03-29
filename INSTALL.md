# Installation

## Prerequisites

You need [Git](https://git-scm.com/downloads) and [NodeJS](https://nodejs.org/en/download/) installed on your computer.
You also need [Python](https://www.python.org/downloads/), this is required by the node-gyp dependency used by node-sass.

## Installation

You can use the template [Webpack Base Project](https://github.com/MorganCaron/webpack-base-project) if you want to avoid making configuration errors by following the instructions below.

Create a new folder for the project and open a terminal there to execute the following commands.

```console
npm init
npm install webpack-config-generator --save-dev
```

You must have an `tsconfig.json` file at the root of your project.

### `package.json`
```diff
{
	"scripts": {
+		"dev": "webpack serve --open --mode development",
+		"build": "webpack --mode production"
	},
}
```
### `tsconfig.json`
```js
{
	"extends": "webpack-config-generator/tsconfig",
	"compilerOptions": {
		"baseUrl": "src",
		"outDir": "build"
	}
}

```

## Usage

### `webpack.config.js`
```js
"use strict";

const webpackConfigGenerator = require("webpack-config-generator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			app: ["./src/ts/App.ts", "./src/sass/style.sass"]
		},
		favicon: "./src/favicon.png"
	});
};
```

### `Project directory`
```
Project
├── build
│   ├── img
│   │   ├── icons
│   │   │   └── ...
│   │   └── example.jpg
│   ├── App.d.ts
│   ├── app.min.css
│   └── app.min.js
├── src
│   ├── css
│   │   └── style.css
│   ├── img
│   │   └── example.jpg
│   ├── sass
│   │   └── style.sass
│   ├── ts
│   │   └── App.ts
│   ├── txt
│   │   └── loremIpsum.txt
│   ├── favicon.png
│   └── index.html
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── webpack.config.js
```

### Options

| Key | Information | Type | Required | Default value |
| --- | --- | --- | --- | --- |
| **mode** | This parameter defines the default behavior of webpack-config-generator. `'development'` or `'production'` | `string` | Yes | `'development'` |
| **watch** | Enables real-time updating. | `boolean` | No | `(mode === 'development')` |
| **showError** | Enables error display. | `boolean` | No | `(mode === 'development')` |
| **minimize** | Minimizes the size of the generated files. | `boolean` | No | `(mode !== 'development')` |
| **sourceMap** | Enables the generation of source map files. | `boolean` | No | `false` |
| **entry** | This parameter takes an object whose key is the name of the final file, and each value is an array of filenames. | `Object` | No | `{}` |
| **index** | Path of the project source file index.html. | `string or null` | No | `'src/index.html'` |
| **inject** | Enables the injection of assets (styles/scripts) in the html file. | `boolean` | No | `true` |
| **buildFolder** | Directory in which to place the generated files. | `string` | No | `'build/'` |
| **favicon** | Name of the favicon file. It must be in the src/ folder. | `string or null` | No | `null` |

Now run the `npm run dev` command to verify that the project has been properly configured.

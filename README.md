# Webpack Config Generator

## *Because configuring Webpack is too far complicated.*

Manually creating webpack configuration files ...

* is time consuming
* is error prone
* requires knowledge of webpack
* has all the disadvantages of copy/paste in case of multiple configuration files

![Github Stars](https://img.shields.io/github/stars/MorganCaron/webpack-config-generator?style=for-the-badge)
![Github Forks](https://img.shields.io/github/forks/MorganCaron/webpack-config-generator?style=for-the-badge)
[![Discord](https://img.shields.io/discord/268838260153909249?label=Chat&logo=Discord&style=for-the-badge)](https://discord.gg/mxZvun4)
[![Contributing](https://img.shields.io/badge/-Contributing-blue?style=for-the-badge)](CONTRIBUTING.md)

### Project Health
[![Codacy](https://img.shields.io/codacy/grade/9db6217bf3c34d6c8a053350d7cd5285?logo=Codacy&style=for-the-badge)](https://www.codacy.com/manual/MorganCaron/webpack-config-generator)
[![Github Actions](https://img.shields.io/github/workflow/status/MorganCaron/webpack-config-generator/Documentation%20deployment?logo=Github&style=for-the-badge)](https://github.com/MorganCaron/webpack-config-generator/actions?query=workflow%3A%22Documentation+deployment%22)

---

## Installation

### Prerequisites
You need [Git](https://git-scm.com/downloads) and [NodeJS](https://nodejs.org/en/download/) installed on your computer.
You also need [Python](https://www.python.org/downloads/), this is required by the node-gyp dependency used by node-sass.

### Configuration
You can use the template [Webpack Base Project](https://github.com/MorganCaron/webpack-base-project) if you want to avoid making configuration errors by following the instructions below.

Create a new folder for the project and open a terminal there to execute the following commands.

```console
npm init
npm install webpack-config-generator --save-dev
```
These commands will generate a big node_modules folder, don't forget to exclude it in a .gitignore file.

You must have an `tsconfig.json` file at the root of your project, add build commands to the `package.json` and create a configuration file named `webpack.config.js`.

#### `tsconfig.json`
```js
{
	"extends": "webpack-config-generator/tsconfig",
	"compilerOptions": {
		"baseUrl": "src",
		"outDir": "build"
	}
}

```

#### `package.json`
```diff
{
	"scripts": {
+		"dev": "webpack serve --open --mode development",
+		"build": "webpack --mode production"
	},
}
```

#### `webpack.config.js`
```js
"use strict";

const webpackConfigGenerator = require("webpack-config-generator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			app: ["./src/ts/App.ts", "./src/sass/style.sass"]
		},
		index: "./src/index.html",
		favicon: "./src/favicon.png"
	});
};
```

#### `Project directory`
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

#### Options

| Key | Information | Type | Required | Default value |
| --- | --- | --- | --- | --- |
| **mode** | This parameter defines the default behavior of webpack-config-generator. `'development'` or `'production'` | `string` | Yes | `'development'` |
| **watch** | Enables real-time updating. | `boolean` | No | `(mode === 'development')` |
| **showError** | Enables error display. | `boolean` | No | `true` |
| **minimize** | Minimizes the size of the generated files. | `boolean` | No | `(mode !== 'development')` |
| **sourceMap** | Enables the generation of source map files. | `boolean` | No | `true` |
| **entry** | This parameter takes an object whose key is the name of the final file, and each value is an array of filenames. | `Object` | No | `{}` |
| **externals** | Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime. | `Object` | No | `{}` |
| **index** | Path of the project source file index.html. | `string or null` | No | `null` |
| **inject** | Enables the injection of assets (styles/scripts) in the html file. | `boolean` | No | `true` |
| **buildFolder** | Directory in which to place the generated files. | `string` | No | `'build/'` |
| **favicon** | Name of the favicon file. It must be in the src/ folder. | `string or null` | No | `null` |
| **tsLoader** | You can choose between two loaders to read the typescript. | `'tsc'` or `'babel'` | No | `tsc` |

Now run the `npm run dev` command to verify that the project has been properly configured.

### Build command

#### Development
In this mode, if one of your files is updated, the code will be recompiled so you don't have to run the full build manually.
```console
npm run dev
```

#### Production
In this mode, the files will be generated in the `build/` directory and automatically included in the index.html file.
```console
npm run build
```

---

## Additional Informations
![Top Language](https://img.shields.io/github/languages/top/MorganCaron/webpack-config-generator?style=for-the-badge)
[![License](https://img.shields.io/github/license/MorganCaron/webpack-config-generator?style=for-the-badge)](https://github.com/MorganCaron/webpack-config-generator/blob/master/LICENSE)

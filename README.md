# Webpack Config Generator
Because configuring Webpack is too far complicated.

![Travis CI](https://img.shields.io/travis/com/MorganCaron/webpack-config-generator.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/MorganCaron/webpack-config-generator.svg?style=flat-square)

## Prerequisites

You need [Git](https://git-scm.com/downloads) and [NodeJS](https://nodejs.org/en/download/) installed on your computer.

## Installation

Create a new folder for the project and open a terminal there to execute the following commands.

```
npm init
npm install webpack-config-generator --save-dev
```

You must have an `tsconfig.json` and a `global.d.ts` file at the root of your project.

### `tsconfig.json`
```js
{
	"compilerOptions": {
		"baseUrl": "src",
		"outDir": "build",
		"noImplicitAny": true,
		"removeComments": true,
		"module": "es6",
		"moduleResolution": "node",
		"target": "es5",
		"jsx": "react",
		"lib": [
			"dom",
			"esnext"
		],
		"declaration": true
	}
}
```

### `global.d.ts`
```js
declare module '*.ico'
declare module '*.png'
declare module '*.svg'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
declare module '*.eot'
declare module '*.otf'
declare module '*.ttf'
declare module '*.woff'
declare module '*.woff2'
declare module '*.txt'
declare module '!!raw-loader!*' {
	const contents: string
	export default contents
}
```

## Usage

### `webpack.config.js`
```js
'use strict'

const WebpackConfigGenerator = require('webpack-config-generator')

module.exports = (env, argv) => {
	return WebpackConfigGenerator({
		mode: argv.mode,
		entry: {
			app: ['./src/ts/App.ts', './src/sass/style.sass']
		},
		favicon: 'favicon.png'
	})
}
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
├── global.d.ts
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
| **index** | Path of the project source file index.html. | `string` | No | `'src/index.html'` |
| **buildFolder** | Directory in which to place the generated files. | `string` | No | `'build/'` |
| **resourcesFolder** | Directory in which to place the generated resources. | `string` | No | `''` |
| **favicon** | Name of the favicon file. It must be in the src/ folder. | `string or null` | No | `null` |

## Development
In this mode, if one of your files is updated, the code will be recompiled so you don't have to run the full build manually.
`npm run dev`
or
`npm run watch`

## Production
In this mode, the files will be generated in the `buildFolder` directory and automatically included in the index.html file.
`npm run prod`
or
`npm run build`

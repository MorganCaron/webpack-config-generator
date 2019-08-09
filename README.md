# Webpack Config Generator
Because configuring Webpack is too far complicated.

![Travis CI](https://img.shields.io/travis/com/MorganCaron/webpack-config-generator.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/MorganCaron/webpack-config-generator.svg?style=flat-square)

## Installation

```
npm install @babel/core @babel/preset-env @intervolga/optimize-cssnano-plugin autoprefixer awesome-typescript-loader babel-loader babel-plugin-prismjs clean-webpack-plugin css-loader favicons-webpack-plugin file-loader html-loader html-webpack-plugin mini-css-extract-plugin node-sass postcss-loader raw-loader resolve-url-loader sass-loader typescript uglifyjs-webpack-plugin webpack webpack-cli webpack-dev-server https://github.com/MorganCaron/webpack-config-generator --save-dev
```

You must have an `tsconfig.json` and a `global.d.ts` file at the root of your project.

### `tsconfig.json`
```js
{
	"compilerOptions": {
		"baseUrl": "src",
		"outDir": "dist",
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
├── dist
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

#### mode
value: `string`: `development` or `production`
default: `development`

#### watch
value: `boolean`
default: `(mode === 'development')`

#### showError
value: `boolean`
default: `(mode === 'development')`

#### minimize
value: `boolean`
default: `(mode !== 'development')`

#### sourceMap
value! `boolean`
default: `false`

#### entry
default: `{}`

#### index
default: `src/index.html`

#### distFolder
default: `'dist/'`

#### resourcesFolder
default: `''`

#### favicon
value: `string`
default: `false`

## Development
In this mode, if one of your files is updated, the code will be recompiled so you don't have to run the full build manually.
`npm run dev`
or
`npm run watch`

## Production
In this mode, the files will be generated in the `/dist` directory and automatically included in the index.html file.
`npm run prod`
or
`npm run build`

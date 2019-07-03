# Webpack Config Generator
Because configuring Webpack is too far complicated.

![Travis CI](https://img.shields.io/travis/com/MorganCaron/webpack-config-generator.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/MorganCaron/webpack-config-generator.svg?style=flat-square)

## Installation

```
npm install @babel/core --save-dev
npm install @babel/preset-env --save-dev
npm install @intervolga/optimize-cssnano-plugin --save-dev
npm install autoprefixer --save-dev
npm install awesome-typescript-loader --save-dev
npm install babel-loader --save-dev
npm install babel-plugin-prismjs --save-dev
npm install clean-webpack-plugin --save-dev
npm install css-loader --save-dev
npm install favicons-webpack-plugin --save-dev
npm install file-loader --save-dev
npm install html-loader --save-dev
npm install html-webpack-plugin --save-dev
npm install mini-css-extract-plugin --save-dev
npm install node-sass --save-dev
npm install postcss-loader --save-dev
npm install raw-loader --save-dev
npm install sass-loader --save-dev
npm install typescript --save-dev
npm install uglifyjs-webpack-plugin --save-dev
npm install webpack --save-dev
npm install webpack-cli --save-dev
npm install webpack-dev-server --save-dev
npm install https://github.com/MorganCaron/webpack-config-generator --save-dev
```

### `tsconfig.json`
```js
{
	"compilerOptions": {
		"baseUrl": "src",
		"outDir": "dist",
		"noImplicitAny": true,
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
		dist: 'dist/',
		favicon: true
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
default: `true`

#### entry
default: `{}`

#### indexSrc
default: `src/index.html`

#### indexDist
default: `(mode === 'development' ? 'index.html' : '../index.html')`

#### dist
default: `'dist/'`

#### favicon
value: `boolean` or `string`
default: `(fs.existsSync('favicon.png') ? 'favicon.png' : false)`

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

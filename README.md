# WebpackConfigGenerator
Because configuring Webpack is too far complicated.

![Travis CI](https://img.shields.io/travis/com/MorganCaron/WebpackConfigGenerator.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/MorganCaron/WebpackConfigGenerator.svg?style=flat-square)

## Installation

`npm install https://github.com/MorganCaron/WebpackConfigGenerator --save-dev`

## Usage

### `webpack.config.js`
```js
const { WebpackConfigGenerator } = require('./webpackConfigGenerator')

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
default: `''`

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

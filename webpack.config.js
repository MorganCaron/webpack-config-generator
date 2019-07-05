'use strict'

const WebpackConfigGenerator = require('./webpackConfigGenerator')

module.exports = (env, argv) => {
	return WebpackConfigGenerator({
		root: __dirname,
		mode: argv.mode,
		entry: {
			app: ['./src/ts/App.ts', './src/sass/style.sass']
		},
		favicon: 'favicon.png'
	})
}

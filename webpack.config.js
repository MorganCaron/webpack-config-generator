'use strict'

const WebpackConfigGenerator = require('./webpackConfigGenerator')

module.exports = (env, argv) => {
	return WebpackConfigGenerator({
		mode: argv.mode,
		entry: {
			app: ['./src/ts/App.ts', './src/sass/style.sass']
		},
		favicon: './src/favicon.png'
	})
}

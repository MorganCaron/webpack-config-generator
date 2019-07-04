'use strict'

const WebpackConfigGenerator = require('./webpackConfigGenerator')

module.exports = (env, argv) => {
	return WebpackConfigGenerator({
		mode: argv.mode,
		entry: {
			app: ['ts/App.ts', 'sass/style.sass']
		},
		favicon: 'favicon.png'
	})
}

"use strict";

const webpackConfigGenerator = require("./webpackConfigGenerator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			app: ["./src/ts/App.ts", "./src/sass/style.sass"]
		},
		favicon: "./src/favicon.png"
	});
};

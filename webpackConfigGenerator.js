"use strict";

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const htmlLoader = (minimize) => {
	return {
		loader: "html-loader",
		options: {
			minimize
		}
	};
};

const cssLoaders = (sourceMap) => [
	{
		loader: MiniCssExtractPlugin.loader,
		options: {
			publicPath: ""
		}
	},
	{
		loader: "css-loader",
		options: {
			sourceMap
		}
	},
	{
		loader: "postcss-loader",
		options: {
			sourceMap,
			postcssOptions: {
				plugins: [
					"postcss-import",
					require("autoprefixer")({
						overrideBrowserslist: ["last 2 versions"]
					})
				]
			}
		}
	}
];

const sassLoader = (sourceMap) => {
	return {
		loader: "sass-loader",
		options: {
			sourceMap
		}
	};
};

const babelJsLoaderPresets = [
	["@babel/preset-env", {
		useBuiltIns: "entry",
		corejs: 3,
		targets: {
			esmodules: true
		}
	}]
];

const babelJsLoaderPlugins = [
	["@babel/plugin-proposal-decorators", { "legacy": true }],
	"@babel/proposal-class-properties"
];

const jsLoader = {
	loader: "babel-loader",
	options: {
		presets: babelJsLoaderPresets,
		plugins: babelJsLoaderPlugins
	}
};

const babelTsLoader = {
	loader: "babel-loader",
	options: {
		presets: [
			...babelJsLoaderPresets,
			"@babel/preset-typescript"
		],
		plugins: babelJsLoaderPlugins
	}
};

const tsLoader = {
	loader: "ts-loader",
	options: {
		transpileOnly: false, // Enabling transpileOnly disables typechecking but also disables the generation of source maps (.min.js.map) and declaration files (.d.ts)
	}
};

const shaderLoaders = [
	'raw-loader',
	'glslify-loader'
];

const logs = (showErrors) => {
	return {
		colors: true,
		hash: false,
		version: false,
		timings: false,
		assets: false,
		chunks: false,
		modules: false,
		reasons: false,
		children: false,
		source: false,
		errors: showErrors,
		errorDetails: showErrors,
		warnings: showErrors,
		publicPath: false
	};
};

const webpackConfigGenerator = (config) => {
	const devmode = (config.mode === "development");
	const root = process.cwd();
	const completeConfig = {
		mode: "development",
		watch: devmode,
		showErrors: true,
		minimize: !devmode,
		sourceMap: true,
		entry: {},
		externals: {},
		index: null,
		inject: true,
		buildFolder: "build/",
		favicon: null,
		tsLoader: "tsc",
		...config
	};
	console.log("----------------------------------------");
	console.log("Webpack Configuration:");
	console.log(completeConfig);
	console.log("----------------------------------------");
	console.log("Please wait...");
	return {
		mode: completeConfig.mode,
		entry: completeConfig.entry,
		externals: completeConfig.externals,
		output: {
			filename: "[name].min.js",
			path: path.join(root, completeConfig.buildFolder),
			publicPath: ""
		},
		devtool: (completeConfig.sourceMap ? (devmode ? "eval-source-map" : "source-map") : false),
		devServer: {
			contentBase: path.join(root, completeConfig.buildFolder),
			hot: completeConfig.watch,
			watchContentBase: completeConfig.watch,
			noInfo: true,
			clientLogLevel: "warn",
			stats: logs(completeConfig.showErrors)
		},
		stats: logs(completeConfig.showErrors),
		resolve: {
			modules: ["src", "node_modules"],
			preferRelative: true,
			extensions: [".css", ".sass", ".scss", ".js", ".jsx", ".ts", ".tsx", ".json", ".ico", ".png", ".svg", ".jpg", ".jpeg", ".gif", ".webp", ".eot", ".otf", ".ttf", ".woff", ".woff2", ".txt"],
		},
		module: {
			rules: [
				{
					test: /\.html$/i,
					use: htmlLoader(completeConfig.minimize)
				},
				{
					test: /\.css$/i,
					use: cssLoaders(completeConfig.sourceMap)
				},
				{
					test: /\.s[ac]ss$/i,
					use: [...cssLoaders(completeConfig.sourceMap), sassLoader(completeConfig.sourceMap)]
				},
				{
					test: /\.jsx?$/i,
					use: jsLoader
				},
				{
					test: /\.tsx?$/i,
					use: (completeConfig.tsLoader === "babel") ? babelTsLoader : tsLoader
				},
				{
					test: /\.(ico|png|svg|jpe?g|gif|webp)$/i,
					type: "asset/resource",
					generator: {
						filename: "img/[contenthash][ext][query]"
					}
				},
				{
					test: /\.(eot|otf|ttf|woff2?)$/i,
					type: "asset/resource",
					generator: {
						filename: "fnt/[contenthash][ext][query]"
					}
				},
				{
					test: /\.txt$/i,
					type: "asset/source",
					generator: {
						filename: "txt/[contenthash][ext][query]"
					}
				},
				{
					test: /\.(glb|gltf)$/i,
					type: "asset/resource",
					generator: {
						filename: "models/[contenthash][ext][query]"
					}
				},
				{
					test: /\.(glsl|vs|fs|vert|frag)$/i,
					use: shaderLoaders
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			...(completeConfig.index != null ? [new HtmlWebpackPlugin({
				filename: "index.html",
				template: completeConfig.index,
				minify: completeConfig.minimize,
				cache: true,
				inject: completeConfig.inject,
				meta: {
					viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
				},
				showErrors: completeConfig.showErrors
			})] : []),
			new MiniCssExtractPlugin({
				filename: "[name].min.css",
				chunkFilename: "[id].min.css"
			}),
			new OptimizeCssnanoPlugin({
				cssnanoOptions: {
					preset: ["default", {
						discardComments: {
							removeAll: true,
						}
					}]
				}
			}),
			...(typeof completeConfig.favicon === "string" ? [
				new FaviconsWebpackPlugin({
					logo: completeConfig.favicon,
					publicPath: "./",
					prefix: "img/icons/",
					emitStats: false,
					statsFilename: "iconstats-[contenthash].json",
					persistentCache: false,
					inject: true,
					background: "#fff",
					icons: {
						android: true,
						appleIcon: true,
						appleStartup: true,
						coast: false,
						favicons: true,
						firefox: true,
						opengraph: false,
						twitter: true,
						yandex: true,
						windows: true
					}
				})
			] : []),
			new CopyPlugin({
				patterns: [
					{ from: "src/static", to: "static", noErrorOnMissing: true }
				],
			}),
		]
	};
};

module.exports = webpackConfigGenerator;

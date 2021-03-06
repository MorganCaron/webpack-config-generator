"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
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
	"css-loader",
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
	},
	"resolve-url-loader"
];

const jsLoader = {
	loader: "babel-loader",
	options: {
		presets: [
			"@babel/preset-env"
		]
	}
};

const webpackConfigGenerator = (config) => {
	const devmode = (config.mode === "development");
	const root = process.cwd();
	const completeConfig = {
		mode: "development",
		watch: devmode,
		showErrors: devmode,
		minimize: !devmode,
		sourceMap: false,
		entry: {},
		index: "src/index.html",
		buildFolder: "build/",
		favicon: null,
		...config
	};
	console.log("----------------------------------------");
	console.log("Webpack Configuration:");
	console.log(completeConfig);
	console.log("----------------------------------------");
	return {
		mode: completeConfig.mode,
		entry: completeConfig.entry,
		output: {
			filename: "[name].min.js",
			path: path.join(root, completeConfig.buildFolder),
			publicPath: ""
		},
		watch: completeConfig.watch,
		devServer: {
			contentBase: path.join(root, completeConfig.buildFolder),
			open: completeConfig.watch,
			hot: completeConfig.watch
		},
		devtool: (completeConfig.sourceMap ? "source-map" : false),
		resolve: {
			modules: ["src", "node_modules"],
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
					use: [...cssLoaders(completeConfig.sourceMap), "sass-loader"]
				},
				{
					test: /\.tsx?$/i,
					use: [jsLoader, "awesome-typescript-loader"]
				},
				{
					test: /\.(ico|png|svg|jpe?g|gif|webp)$/i,
					type: "asset/resource",
					generator: {
						filename: "img/[hash][ext][query]"
					}
				},
				{
					test: /\.(eot|otf|ttf|woff2?)$/i,
					type: "asset/resource",
					generator: {
						filename: "fnt/[hash][ext][query]"
					}
				},
				{
					test: /\.txt$/i,
					type: "asset/source",
					generator: {
						filename: "txt/[hash][ext][query]"
					}
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: completeConfig.index,
				minify: completeConfig.minimize,
				cache: true,
				showErrors: completeConfig.showErrors
			}),
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
			new CheckerPlugin(),
			...(typeof completeConfig.favicon === "string" ? [
				new FaviconsWebpackPlugin({
					logo: completeConfig.favicon,
					publicPath: "./",
					prefix: "img/icons/",
					emitStats: false,
					statsFilename: "iconstats-[hash].json",
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
			] : [])
		]
	};
};

module.exports = webpackConfigGenerator;

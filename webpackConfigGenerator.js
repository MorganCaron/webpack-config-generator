'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')

const htmlLoader = minimize => {
	return {
		loader: 'html-loader',
		options: {
			minimize: minimize,
			removeComments: minimize
		}
	}
}

const cssLoaders = (hotReload, sourceMap) => [
	{
		loader: MiniCssExtractPlugin.loader,
		options: {
			hmr: hotReload,
			publicPath: ''
		}
	},
	'css-loader',
	{
		loader: 'postcss-loader',
		options: {
			sourceMap: sourceMap,
			plugins: loader => [
				require('autoprefixer')({
					overrideBrowserslist: ['last 2 versions']
				})
			]
		}
	},
	'resolve-url-loader'
]

const jsLoader = {
	loader: 'babel-loader',
	options: {
		presets: ['@babel/preset-env']
	}
}

const fileLoader = outputPath => {
	return {
		loader: 'file-loader',
		options: {
			name: '[name].[ext]',
			outputPath: outputPath
		}
	}
}

const WebpackConfigGenerator = config => {
	const devmode = (config.mode === 'development')
	const root = process.cwd()
	const completeConfig = {
		mode: 'development',
		watch: devmode,
		showErrors: devmode,
		minimize: !devmode,
		sourceMap: false,
		entry: {},
		index: 'src/index.html',
		buildFolder: 'build/',
		resourcesFolder: './',
		favicon: null,
		...config
	}
	console.log(completeConfig)
	return {
		mode: completeConfig.mode,
		entry: completeConfig.entry,
		output: {
			filename: '[name].min.js',
			path: path.join(root, completeConfig.buildFolder),
			publicPath: ''
		},
		watch: completeConfig.watch,
		devServer: {
			contentBase: path.join(root, completeConfig.buildFolder)
		},
		devtool: (completeConfig.sourceMap ? 'source-map' : false),
		resolve: {
			modules: ['src', 'node_modules'],
			extensions: ['.css', '.sass', '.scss', '.js', '.jsx', '.ts', '.tsx', '.json', '.ico', '.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp', '.eot', '.otf', '.ttf', '.woff', '.woff2', '.txt'],
		},
		module: {
			rules: [
				{
					test: /\.html$/i,
					use: htmlLoader(completeConfig.minimize)
				},
				{
					test: /\.css$/i,
					use: cssLoaders(completeConfig.watch, completeConfig.sourceMap)
				},
				{
					test: /\.s(a|c)ss$/i,
					use: [...cssLoaders(completeConfig.watch), 'sass-loader']
				},
				{
					test: /\.tsx?$/i,
					use: [jsLoader, 'awesome-typescript-loader']
				},
				{
					test: /\.(ico|png|svg|jpe?g|gif|webp)$/i,
					use: fileLoader(path.join(completeConfig.resourcesFolder, 'img'))
				},
				{
					test: /\.(eot|otf|ttf|woff2?)$/i,
					use: fileLoader(path.join(completeConfig.resourcesFolder, 'font'))
				},
				{
					test: /\.txt$/i,
					use: 'raw-loader'
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: completeConfig.index,
				minify: completeConfig.minimize,
				cache: true,
				showErrors: completeConfig.showErrors
			}),
			new MiniCssExtractPlugin({
				filename: '[name].min.css',
				chunkFilename: '[id].min.css',
				disable: devmode
			}),
			new OptimizeCssnanoPlugin({
				cssnanoOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true,
						}
					}]
				}
			}),
			new CheckerPlugin(),
			new UglifyJsPlugin({
				test: /\.js($|\?)/i,
				cache: true,
				parallel: true
			}),
			...(typeof completeConfig.favicon === 'string' ? [
				new FaviconsWebpackPlugin({
					logo: completeConfig.favicon,
					publicPath: completeConfig.resourcesFolder,
					prefix: 'img/icons/',
					emitStats: false,
					statsFilename: 'iconstats-[hash].json',
					persistentCache: false,
					inject: true,
					background: '#fff',
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
	}
}

module.exports = WebpackConfigGenerator

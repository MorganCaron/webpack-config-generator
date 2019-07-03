const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')
const fs = require('fs')

const htmlLoader = minimize => {
	return {
		loader: 'html-loader',
		options: {
			minimize: minimize,
			removeComments: minimize
		}
	}
}

const cssLoaders = hotReload => [
	{
		loader: MiniCssExtractPlugin.loader,
		options: {
			hmr: hotReload
		}
	},
	'css-loader',
	{
		loader: 'postcss-loader',
		options: {
			plugins: loader => [
				require('autoprefixer')({
					overrideBrowserslist: ['last 2 versions']
				})
			]
		}
	}
]

const jsLoader = {
	loader: 'babel-loader',
	options: {
		presets: ['@babel/preset-env']
	}
}

const fileLoader = (root, folder) => {
	return {
		loader: 'file-loader',
		options: {
			name: '[name].[ext]',
			outputPath: folder,
			publicPath: root + folder
		}
	}
}

const WebpackConfigGenerator = config => {
	const devmode = (config.mode === 'development')
	const completeConfig = {
		mode: 'development',
		watch: devmode,
		showErrors: devmode,
		minimize: true,
		entry: {},
		indexSrc: 'src/index.html',
		indexDist: (devmode ? 'index.html' : '../index.html'),
		dist: '',
		favicon: (fs.existsSync('favicon.png') ? 'favicon.png' : false),
		...config
	}
	console.log(completeConfig)
	return {
		mode: completeConfig.mode,
		entry: completeConfig.entry,
		output: {
			path: __dirname + '/' + completeConfig.dist,
			publicPath: (devmode ? '' : completeConfig.dist),
			filename: '[name].min.js'
		},
		watch: completeConfig.watch,
		devServer: {
			contentBase: completeConfig.dist
		},
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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
					use: cssLoaders(completeConfig.watch)
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
					use: fileLoader(devmode ? '' : completeConfig.dist, 'img/')
				},
				{
					test: /\.(eot|otf|ttf|woff2?)$/i,
					use: fileLoader(devmode ? '' : completeConfig.dist, 'font/')
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
				filename: completeConfig.indexDist,
				template: completeConfig.indexSrc,
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
			...(completeConfig.favicon ? [] : [
				new FaviconsWebpackPlugin({
					logo: (typeof completeConfig.favicon === 'string' ? completeConfig.favicon : 'favicon.png'),
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
			])
		]
	}
}

module.exports = WebpackConfigGenerator

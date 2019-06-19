const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
	const dev = (argv.mode === 'development')
	const prod = !dev
	const minimize = prod
	const htmlLoader = {
		loader: 'html-loader',
		options: {
			minimize: true,
			removeComments: true
		}
	}
	const cssLoaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: dev,
			},
		},
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				plugins: (loader) => [
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
	const fileLoader = (folder) => {
		return {
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: folder,
				publicPath: (dev ? folder : 'dist/' + folder)
			}
		}
	}
	return {
		mode: argv.mode,
		entry: {
			app: ['./src/ts/App.ts', './src/sass/style.sass']
		},
		output: {
			path: __dirname + '/dist',
			filename: (dev ? '[name].min.js' : '[name].[contenthash].min.js'),
		},
		watch: dev,
		devServer: {
			contentBase: './dist'
		},
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
			extensions: ['.css', '.sass', '.scss', '.js', '.jsx', '.ts', '.tsx', '.json', '.ico', '.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp', '.eot', '.otf', '.ttf', '.woff', '.woff2', '.txt'],
		},
		module: {
			rules: [
				{
					test: /\.html$/i,
					use: htmlLoader
				},
				{
					test: /\.css$/i,
					use: cssLoaders
				},
				{
					test: /\.s(a|c)ss$/i,
					use: [...cssLoaders, 'sass-loader']
				},
				{
					test: /\.jsx?$/i,
					use: jsLoader
				},
				{
					test: /\.tsx?$/i,
					use: [jsLoader, 'ts-loader']
				},
				{
					test: /\.(ico|png|svg|jpe?g|gif|webp)$/i,
					use: fileLoader('img/')
				},
				{
					test: /\.(eot|otf|ttf|woff2?)$/i,
					use: fileLoader('font/')
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
				filename: (dev ? 'index.html' : '../index.html'),
				template: 'src/index.html',
				favicon: 'src/favicon.png',
				minify: minimize,
				cache: true,
				showErrors: dev
			}),
			new MiniCssExtractPlugin({
				filename: (dev ? '[name].min.css' : '[name].[contenthash].min.css'),
				chunkFilename: (dev ? '[id].min.css' : '[id].[contenthash].min.css'),
				disable: dev
			}),
			new OptimizeCssnanoPlugin({
				cssnanoOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true,
						},
					}],
				},
			}),
			new UglifyJsPlugin({
				test: /\.js($|\?)/i,
				cache: true,
				parallel: true
			})
		]
	}
}

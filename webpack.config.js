const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/js/index.js",

	output: {
		library: 'Subj',
		libraryTarget: 'window',
		libraryExport: 'default',
		path: path.resolve(__dirname, "dist"),
		filename: "js/subj.js",
	},
	//devtool: "source-map",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			}
		}, {
			test: /\.css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: './src'
					}
				},
				'css-loader'
			]
		}]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "style/subj.css",
			//chunkFilename: "_subj_.css"
		}),

		new HtmlWebpackPlugin({
			template: "./src/app.html"
		})
	],

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},

	devServer: {
		publicPath: '/',
		contentBase: path.join(__dirname, 'dist'),
		compress: false,
		stats: 'errors-only',
		open: true
	}
};
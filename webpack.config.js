const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const JS = path.resolve(__dirname, 'js');
const DIST = path.resolve(__dirname, 'dist');
const NODE_MODULES_PATH = path.resolve(__dirname, './node_modules');

const getPlugins = isProduction => [
	new webpack.DefinePlugin({
		__IS_PRODUCTION__: JSON.stringify(isProduction)
	}),
	new HtmlWebpackPlugin({
		chunks: ['index'],
		filename: path.join(DIST, 'index.html'),
		template: path.join(__dirname, 'index.html')
	}),
	new MiniCssExtractPlugin({
		publicPath: '',
		filename: './[name].[hash].css'
	}),
	new CleanWebpackPlugin()
];

module.exports = env => {
	const isProduction = env && env.production;

    return {
		mode: isProduction ? 'production' : 'development',
        resolve: {
			modules: [NODE_MODULES_PATH],
			extensions: ['.js']
		},
		entry: {
			index: path.join(__dirname, 'js/index.js')
		},
            output: {
            publicPath: '',
            path: DIST,
            filename: '[name].[hash].js'
		},
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true
                        }
                    }]
                },
                {
					test: /\.(sass|scss)$/,
					use: [
                        {
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader',
							options: {
								url: false
							}
						},
						{
                            loader: 'sass-loader',
						}
					]
				}
            ]
        },
        devServer: {historyApiFallback: true},
        plugins: getPlugins(isProduction),
        devtool: "source-map",
    }
}

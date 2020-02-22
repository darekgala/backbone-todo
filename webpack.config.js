const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const JS = path.resolve(__dirname, 'js');
const DIST = path.resolve(__dirname, 'dist');

module.exports = () => {
    return {
        entry: './js/index.js',
        resolve: {
            modules: [JS, path.resolve(__dirname, 'node_modules')],
            extensions: ['.js']
        },
        output: {
            path: DIST,
            filename: 'index.js',
            publicPath: '/'
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
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
							loader: 'sass-loader'
						}
					]
				}
            ]
        },
        devServer: {historyApiFallback: true},
        plugins: [
            new HtmlWebpackPlugin({
                filename: path.join(DIST, 'index.html'),
                template: path.resolve(__dirname, 'index.html')
            }),
            new MiniCssExtractPlugin({
                publicPath: '',
                filename: './style.css'
            })
        ]
    }
}

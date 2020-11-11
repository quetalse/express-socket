const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'develop',
    entry: './src/client.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        overlay: true,
        // contentBase: './public',
        // filename: 'chat.html',
        hot: true,
        port: 3001,
        open: true,
        historyApiFallback: true
    },
    devtool: 'inline-source-map' // для отладки в браузере
})
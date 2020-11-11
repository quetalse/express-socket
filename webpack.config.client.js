const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {StatsWriterPlugin} = require('webpack-stats-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'public/css'),
                        },
                    },'css-loader', 'sass-loader'],

            }
        ]
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyJSPlugin({
    //             cache: true,
    //             parallel: true,
    //             uglifyOptions: {
    //                 compress: false,
    //                 ecma: 6,
    //                 mangle: true
    //             },
    //             sourceMap: false
    //         })
    //     ]
    // },
    plugins: [
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new StatsWriterPlugin({
            stats: {
                all: false,
                assets: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '../css/styles.[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: '../chat.html'
        }),
    ],
    devtool: 'inline-source-map' // для отладки в браузере

})
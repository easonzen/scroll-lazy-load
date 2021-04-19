const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(path.resolve(__dirname, 'dist'))

const devConfig = {
    mode: 'development',
    entry: path.join(__dirname, "../examples/index"),
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'public/index.html',
        }),
    ],
    devServer: {
        host: '127.0.0.1',
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
}

module.exports = merge(baseConfig, devConfig);
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const TerserPlugin = require("terser-webpack-plugin");

const prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    entry: path.resolve(__dirname, '../src/index'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
}

module.exports = merge(baseConfig, prodConfig);
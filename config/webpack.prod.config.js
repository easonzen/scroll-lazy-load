const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const TerserPlugin = require("terser-webpack-plugin");

const prodConfig = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../lib'),
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
}

module.exports = merge(baseConfig, prodConfig);
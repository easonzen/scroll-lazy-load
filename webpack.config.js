const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
    devServer: {
        host: '127.0.0.1',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    }
};
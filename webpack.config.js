const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    entry: './src/index',
    // devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node-modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'public/index.html',
        }),
    ],
    devServer: {
        host: '127.0.0.1',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
}

module.exports = (env, argv) => {
    console.log(env, argv)
    if (argv.mode === 'production') {
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()]
        };
    }

    return config;
};
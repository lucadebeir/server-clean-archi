const path = require('path');
const webpack = require('webpack');
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    entry: [
        path.resolve('./adapters/primaries/rest/server.ts')
    ],
    mode: 'production',
    output: {
        path: path.resolve('./dist'),
        filename: 'backend-marinerecipes.js',
        publicPath: '/'
    },
    optimization: {minimize: true},
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
            {test: /\.ts?$/, exclude: /node_modules/, use: ['ts-loader']},
            {test: /\.html$/, loader: "html-loader"},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    plugins: [
        new webpack.IgnorePlugin({resourceRegExp: /^pg-native$/}),
        new Dotenv({
            path: './.env.prod'
        }),
        new NodePolyfillPlugin(),
        new CopyPlugin({
            patterns: [
                {from: "./adapters/secondaries/image/config", to: "config"},
                {from: "./adapters/secondaries/mail/templates", to: "templates"}
            ]
        })
    ],
    externals: [nodeExternals()]
};

module.exports = config;

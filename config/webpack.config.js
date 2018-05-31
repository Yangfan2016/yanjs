const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin=require("html-webpack-plugin");

module.exports = {
    mode:"production",
    entry: {
        "Yan":path.resolve(__dirname, '../src/Yan.js')
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].min.js',
        publicPath: "./build/",
        libraryTarget: 'umd'
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: path.resolve(__dirname, "../index.html"),
        })
    ]
};
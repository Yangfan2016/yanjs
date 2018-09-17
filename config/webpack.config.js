const path = require('path');

module.exports = {
    mode:"production",
    entry: {
        "yan":path.resolve(__dirname, '../src/yan.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].min.js',
        publicPath: "./dist/",
        libraryTarget: 'umd'
    }
};
const path = require('path');

module.exports = {
    mode:"production",
    entry: {
        "Yan":path.resolve(__dirname, '../src/Yan.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].min.js',
        publicPath: "./dist/",
        libraryTarget: 'umd'
    }
};
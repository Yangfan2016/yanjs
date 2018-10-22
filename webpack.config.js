const path = require('path');

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        "yan": path.resolve(__dirname, './src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
        publicPath: "./dist/",
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
                // 只命中src目录里的js文件，加快 Webpack 搜索速度
                include: path.resolve(__dirname, "./src/")
            }
        ]
    },
    resolve:{
        extensions:['.js','.ts']
    }
};
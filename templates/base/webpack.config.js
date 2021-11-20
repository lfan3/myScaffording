const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//add extra-text.. plugin to split css with js
module.exports = {
    entry: ['@babel/polyfill', './app/index.js'],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        //public: '/dist'
    },
    mode: 'development',
    devtool: 'source-map',
    module:{
        rules:[
            {test:/\.js$/, exclude: /node_modules/, use:'babel-loader'},
            {
                test: /\.(png|jpe?g|gif)$/i, 
                use: [
                    {
                        loader: 'file-loader', 
                        options: {
                            name: '[name].[ext]',
                            output: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            },
            {test:/\.(css)$/, use:['style-loader', 'css-loader']}
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            title: 'Development'
        })
    ],
    devServer:{
        historyApiFallback:true,
        port: 8001
    }
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin ({
    template: './client/index.html',
    filename: 'index.html',
    inject: "body",
    minify: {
        collapseWhitespace: true
      }
})

const ExtractTextPluginConfig = new ExtractTextPlugin ('style.css', { allChunks: true})

const cssModulesLoader = [
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            { 
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: ['postcss-loader', cssModulesLoader, 'style']
            },
            {
                test: /\.scss$/,
                loaders: ['postcss-loader', cssModulesLoader, 'style', 'sass?sourceMap']
            }
        ]
    },

    plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig]
    
}
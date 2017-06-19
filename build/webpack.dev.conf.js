/* eslint-disable */

var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestWebpackPlugin = require('./plugins/manifest-webpack-plugin');
var SwRegisterWebpackPlugin = require('sw-register-webpack-plugin');
var SWPrecacheWebpackDevServerPlugin = require('sw-precache-webpack-dev-server-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },

    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css')
        }),

        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: utils.assetsPath('img/icons/favicon.ico'),
            // exclude skeleton and sw-register chunk
            excludeChunks: ['skeleton', config.swRegister.name || 'sw-register']
        }),
        // service worker caching
        new SWPrecacheWebpackDevServerPlugin(config.swPrecache.dev),

        // generate manifest.json, include theme
        new ManifestWebpackPlugin(Object.assign(config.manifest, {
            fileName: utils.assetsPath(config.manifest.fileName)
        }, config.theme.manifest)),

        new SwRegisterWebpackPlugin(),

        new FriendlyErrorsPlugin()
    ]
});

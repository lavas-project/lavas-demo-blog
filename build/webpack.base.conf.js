/* eslint-disable */

var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        app: './src/client-entry.js',
        skeleton: './src/skeleton-entry.js',
        [config.swRegister.name || 'sw-register']: './src/sw-register.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // resolve alias
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            // register custom svgs
            {
                resource: resolve('src/svg'),
                loader: 'svg-loader',
                enforce: 'pre'
            },
            // inject skeleton route in dev mode
            {
                resource: resolve('src/router'),
                loader: 'router-loader',
                enforce: 'pre'
            },
            // inject vuetify theme variables
            {
                resource: resolve('src/assets/styles/global'),
                loader: 'theme-loader',
                enforce: 'pre'
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: vueLoaderConfig
                    },
                    // inject global variables in every .vue file
                    {
                        loader: 'theme-loader',
                        options: {
                            injectInVueFile: true
                        }
                    }
                ],
                include: [resolve('src')]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: vueLoaderConfig
                    }
                ],
                exclude: [resolve('src')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    resolveLoader: {
        alias: {
            'svg-loader': path.join(__dirname, './loaders/svg-loader'),
            'router-loader': path.join(__dirname, './loaders/router-loader'),
            'theme-loader': path.join(__dirname, './loaders/theme-loader')
        }
    }
};

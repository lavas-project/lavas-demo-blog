/**
 * @file vue-loader 配置文件
 * @author chenqiushi(chenqiushi@baidu.com)
 */


var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction
            ? config.build.productionSourceMap
            : config.dev.cssSourceMap,
        // extract: isProduction
        extract: true
    })
};

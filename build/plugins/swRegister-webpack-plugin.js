/**
 * @file 生成 service-worker-register.js
 * @author chenqiushi(chenqiushi@baidu.com)
 */

/* eslint-disable */

const fs = require('fs');
const path = require('path');
const config = require('../../config');

/**
 * sw Register 插件
 *
 * @constructor
 * @param {Object} options 参数
 */
function SwRegisterPlugin(options) {
    this.options = Object.assign({}, options || {});
}



SwRegisterPlugin.prototype.apply = function (compiler) {

    let filePath = this.options.filePath;
    delete this.options.filePath;

    function p(value) {
        return value < 10 ? '0' + value : value;
    }

    function escapeRe(str) {
        return str.replace(/[-_\.\*]/g, c => {
            return '\\' + c;
        });
    }

    // 生成 sw register 的 内容
    let d = new Date();
    let version = ''
        + d.getFullYear()
        + p(d.getMonth() + 1)
        + p(d.getDate())
        + p(d.getHours())
        + p(d.getMinutes())
        + p(d.getSeconds());

        compiler.plugin('emit', (compilation, callback) => {
            Object.keys(compilation.assets).forEach(asset => {

                const jsregStr = "^static\\/js\\/" + escapeRe(config.swRegister.name || 'sw-register') + '\\..+\\.js$';
                const jsre = new RegExp(jsregStr, 'g');

                if (jsre.test(asset)) {
                    let content = compilation.assets[asset].source();
                    content = content.replace(/\.js/g, '.js?v=' + version);
                    compilation.assets[(config.swRegister.name || 'sw-register') + '.js'] = {
                        source:() => content,
                        size:() => content.length
                    };

                    delete compilation.assets[asset];
                }
            });
            callback();
        });

};


module.exports = SwRegisterPlugin;

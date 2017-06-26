/**
 * @file mock api plugin
 * @author tanglei (tanglei02@baidu.com)
 */

var path = require('path');
var fs = require('fs-extra');

/**
 * APIPlugin constructor
 *
 * @class
 */
function APIPlugin() {
    this.path = path.resolve(__dirname, '../../mock');
}

APIPlugin.prototype.apply = function (compiler) {
    if (fs.existsSync(this.path)) {
        var mockPath = this.path;
        var outputPath = compiler.options.output.path;

        compiler.plugin('after-emit', function (compilation, callback) {
            console.log('Starting to copy api data...');
            fs.copySync(mockPath, outputPath);
            console.log('Api data copy complete');
            callback();
        });
    }
};

module.exports = APIPlugin;

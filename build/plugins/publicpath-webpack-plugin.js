/**
 * @file mock api plugin
 * @author tanglei (tanglei02@baidu.com)
 */

var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

function PublicPlugin(options) {
    options = options || {};
    this.publicPath = options.publicPath || '/';
    this.static = options.static || 'static';
};

PublicPlugin.prototype.apply = function (compiler) {
    var outputPath = compiler.options.output.path;
    var oldPrefix = fix(this.static);
    var newPfefix = fix(join([this.publicPath, this.static]));
    var regex = new RegExp('([^\\w-]|^)' + oldPrefix + '(.*?)\\.(\\w+?)', 'mg');

    compiler.plugin('after-emit', function (compilation, callback) {
        var files = glob.sync(
        '**/*',
            {
                cwd: outputPath,
                root: outputPath
            }
        )
        .filter(function (filePath) {
            return ['.html', '.css', '.js', '.json'].indexOf(path.extname(filePath)) > -1;
        })
        .forEach(function (filePath) {
            var dir = path.resolve(outputPath, filePath);
            var stat = fs.statSync(dir);
            if (stat.isDirectory()) {
                return;
            }

            var file = fs.readFileSync(dir, 'utf-8');
            file = file.replace(regex, '$1' + newPfefix + '$2.$3');
            fs.outputFileSync(dir, file);
        });

        callback();
    });
};

function join(arr) {
    return path.join.apply(path, arr).replace(/\\/g, '/');
}

function fix(str) {
    return ('/' + str + '/').replace(/^\/\//, '/').replace(/\/\/$/, '/');
}

module.exports = PublicPlugin;
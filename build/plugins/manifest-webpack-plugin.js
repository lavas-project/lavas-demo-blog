/**
 * @file 生成manifest.json
 */

const META_THEME_COLOR_HOLDER = `<!-- META_THEME_COLOR -->`;

function ManifestPlugin(options) {
    this.options = Object.assign({
        fileName: 'manifest.json'
    }, options || {});
}

ManifestPlugin.prototype.apply = function (compiler) {
    let {fileName, themeColor} = this.options;
    delete this.options.fileName;
    // 生成json内容
    let jsonContent = JSON.stringify(this.options, (key, value) => {
        if (value && typeof value === 'object') {
            return Object.keys(value)
                // 键名驼峰转成下划线形式
                .map(key => {
                    return {
                        k: key.replace(/([A-Z])/g, (exp, upperCase) => `_${upperCase.toLowerCase()}`),
                        v: value[key]
                    };
                })
                // 替换原对象
                .reduce((prev, {k, v}) => {
                    prev[k] = v;
                    return prev;
                }, Array.isArray(value) ? [] : {});
        }
        return value;
    });
    compiler.plugin('emit', (compilation, callback) => {
        // 写入manifest.json
        compilation.assets[fileName] = {
            source: () => jsonContent,
            size: () => jsonContent.length
        };
        callback();
    });

    compiler.plugin('compilation', compilation => {
        // 在html插件处理前修改模版
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            htmlPluginData.html = htmlPluginData.html.replace(META_THEME_COLOR_HOLDER, themeColor);
            callback(null, htmlPluginData);
        });
    });
};

module.exports = ManifestPlugin;

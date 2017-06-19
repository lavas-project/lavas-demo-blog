/**
 * @file 生成skeleton
 */

const serialize = require('serialize-javascript');
const SKELETON_STYLE_HOLDER = '<!-- SKELETON_STYLE -->';
const SKELETON_HTML_HOLDER = '<!-- SKELETON_HTML -->';
const SKELETON_ENTRY_NAME = 'skeleton';

function SkeletonPlugin(options) {
    Object.assign(this, options);
}

SkeletonPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', compilation => {
        // 在html插件处理前修改模版
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            // 找到skeleton的样式
            let skeletonStyle = '';
            Object.keys(compilation.assets).filter(
                filename => new RegExp(`.*${SKELETON_ENTRY_NAME}.*\.css$`).test(filename)
            ).forEach(cssFilename => {
                skeletonStyle += compilation.assets[cssFilename].source();
            });
            // skeleton样式内联
            htmlPluginData.html = htmlPluginData.html.replace(SKELETON_STYLE_HOLDER, `<style>${skeletonStyle}</style>`);
            // 删掉skeleton chunk相关文件
            compilation.chunks.forEach(chunk => {
                if (chunk.name === SKELETON_ENTRY_NAME) {
                    chunk.files.forEach(fileName => {
                        delete compilation.assets[fileName];
                    });
                }
            });
            // 替换掉模版中的skeleton挂载点
            htmlPluginData.html = htmlPluginData.html.replace(SKELETON_HTML_HOLDER, this.skeletonHtml);
            // 如果需要输出初始状态
            if (this.needInitialState) {
                let initialStateHtml = '';
                if (this.initialState) {
                    initialStateHtml = `<script>window.__INITIAL_STATE__=${
                        serialize(this.initialState, { isJSON: true })
                    }</script>`;
                }
                htmlPluginData.html = htmlPluginData.html.replace('<!-- INITIAL_STATE -->', initialStateHtml);
            }
            callback(null, htmlPluginData);
        });
    });
};

module.exports = SkeletonPlugin;

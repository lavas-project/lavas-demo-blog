/**
 * @file 向html中插入cdn
 */

const CDN_JS_HOLDER = '<!-- CDN_JS -->';
const CDN_CSS_HOLDER = '<!-- CDN_CSS -->';

function CdnPlugin(options) {
    this.options = Object.assign({}, options || {});
}

CdnPlugin.prototype.apply = function (compiler) {

    compiler.plugin('compilation', compilation => {
        // 在html插件处理前修改模版
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            let cdnJsHtml = '';
            let cdnCssHtml = '';
            let {js, css} = this.options;
            if (js) {
                Object.keys(js).forEach(jsDepName => {
                    cdnJsHtml += `<script type="text/javascript" src="${js[jsDepName]}"></script>`;
                });
            }
            if (css) {
                Object.keys(css).forEach(cdnPath => {
                    cdnCssHtml += `<link rel="stylesheet" href="${cdnPath}">`;
                });
            }
            htmlPluginData.html = htmlPluginData.html.replace(CDN_JS_HOLDER, cdnJsHtml);
            htmlPluginData.html = htmlPluginData.html.replace(CDN_CSS_HOLDER, cdnCssHtml);

            callback(null, htmlPluginData);
        });
    });
};

module.exports = CdnPlugin;

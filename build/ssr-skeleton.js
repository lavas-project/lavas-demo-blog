const path = require('path');
const webpack = require('webpack');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const serverWebpackConfig = require('./webpack.server.conf');
const MFS = require('memory-fs');

module.exports = new Promise((resolve, reject) => {
    let serverCompiler = webpack(serverWebpackConfig);
    let mfs = new MFS();
    let outputPath = path.join(serverWebpackConfig.output.path, serverWebpackConfig.output.filename);
    // 输出到mfs中
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) {
            reject(err);
        }
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        let bundle = mfs.readFileSync(outputPath, 'utf-8');
        let renderer = createBundleRenderer(bundle);
        // 渲染skeleton
        renderer.renderToString({}, (err, skeletonHtml) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({skeletonHtml});
            }
        });
    });
});

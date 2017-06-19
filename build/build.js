/*eslint-disable*/

require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');
const ssrPromise = require('./ssr-skeleton');
const SkeletonPlugin = require('./plugins/skeleton-webpack-plugin');

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) {
        throw err;
    }
    ssrPromise.then(ssrResult => {
        webpackConfig.plugins.push(new SkeletonPlugin(ssrResult));
        webpack(webpackConfig, (err, stats) => {
            spinner.stop();
            if (err) {
                console.log(err);
                throw err;
            }
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');

            console.log(chalk.cyan('  Build complete.\n'));
            console.log(chalk.yellow(''
                + '  Tip: built files are meant to be served over an HTTP server.\n'
                + '  Opening index.html over file:// won\'t work.\n'
            ));

            process.exit();
        });
    }).catch(err => {
        spinner.stop();
        console.log(err);
    });
});

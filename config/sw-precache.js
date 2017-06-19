/**
 * sw-precache一些设置项，staticFileGlobs主要是设置具体需要缓存的文件
 * 在webpack.prod.conf.js 中被使用
 * 可使用参考链接
 * https://www.npmjs.com/package/sw-precache-webpack-plugin 具体的配置参数选择
 * https://github.com/GoogleChrome/sw-precache#handlefetch-boolean
 * https://metaquant.org/programing/sw-precache-guide.html
**/
module.exports = {

    /* build时的正式配置文件 */
    build: {
        cacheId: 'my-vue-app',
        filename: 'service-worker.js',

        /* 需缓存的文件配置
           需动态缓存的放到runtimeCaching中处理 */
        staticFileGlobs: [],

        /* webpack生成的静态资源全部缓存 */
        mergeStaticsConfig: true,

        /* 忽略的文件 */
        staticFileGlobsIgnorePatterns: [
            /\.map$/ // map文件不需要缓存
        ],

        /* 需要省略掉的前缀名 */
        stripPrefix: 'dist/',

        /* 当请求路径不在缓存里的返回，对于单页应用来说，入口点是一样的 */
        navigateFallback: '/index.html',

        /* 白名单包含所有的.html (for HTML imports) 和
           路径中含’/data/’(for dynamically-loaded data). */
        navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],

        // minify: true, // 是否压缩，默认不压缩

        // maximumFileSizeToCacheInBytes: 4194304, // 最大缓存大小

        /* 生成service-worker.js的文件配置模板，不配置时采用默认的配置
            本demo做了sw的更新策略，所以在原有模板基础做了相应的修改 */
        templateFilePath: 'build/sw.tmpl',
        verbose: true,
        // 需要根据路由动态处理的文件
        runtimeCaching: [
            {
                urlPattern: /\/material-design-icon/,
                handler: 'networkFirst'
            },
            {
                urlPattern: /\/pwa\.baidu\.com/,
                handler: 'networkFirst'
            },
            {
                urlPattern: /\/vue\//,
                handler: 'networkFirst'
            }
            // ,
            // 如果在staticFileGlobs中设置相同的缓存路径，可能导致此处不起作用
            // {
            //     urlPattern: /\/fonts\//,
            //     handler: 'networkFirst',
            //     options: {
            //         cache: {
            //             maxEntries: 10,
            //             name: 'fonts-cache'
            //         }
            //     }
            // }
        ]
    },

    /* dev-server配置，修改后需要重新npm run dev构建新的service-worker.js的文件 */
    dev: {
        cacheId: 'my-vue-app',
        filename: 'service-worker.js',

        /* 需缓存的文件配置
           需动态缓存的放到runtimeCaching中处理 */
        staticFileGlobs: [],

        /* webpack生成的静态资源全部缓存 */
        mergeStaticsConfig: true,

        /* 忽略的文件 */
        staticFileGlobsIgnorePatterns: [
            /\.map$/ // map文件不需要缓存
        ],

        /* 需要省略掉的前缀名 */
        stripPrefix: '',

        /* 当请求路径不在缓存里的返回，对于单页应用来说，入口点是一样的 */
        navigateFallback: '/index.html',

        /* 白名单包含所有的.html (for HTML imports) 和
           路径中含’/data/’(for dynamically-loaded data). */
        navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],

        // minify: true, // 是否压缩，默认不压缩

        // maximumFileSizeToCacheInBytes: 4194304, // 最大缓存大小

        /* 生成service-worker.js的文件配置模板，不配置时采用默认的配置
            本demo做了sw的更新策略，所以在原有模板基础做了相应的修改 */
        templateFilePath: 'build/sw.tmpl',
        verbose: true,
        // 需要根据路由动态处理的文件,如果在此处配置的文件不要在staticFileGlobs进行
        runtimeCaching: [
            {
                urlPattern: /\/material-design-icon/,
                handler: 'networkFirst'
            }
            // ,
            // 如果在staticFileGlobs中设置相同的缓存路径，可能导致此处不起作用
            // {
            //     urlPattern: /\/fonts\//,
            //     handler: 'networkFirst',
            //     options: {
            //         cache: {
            //             maxEntries: 10,
            //             name: 'fonts-cache'
            //         }
            //     }
            // }
        ]
    }
};

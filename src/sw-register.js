/**
 * @file 注册 service-worker.js， 并监听 service-worker.js 升级更新
 * @author chenqiushi(chenqiushi@baidu.com)
 */

/* global window */

(function (window) {

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker
            .register('/service-worker.js')
            .then(function (registration) {
            });

        navigator.serviceWorker.addEventListener('message', function (e) {
            // received the update message from sw
            if (e.data === 'updateMessage') {
                handleUpdateMessage(e);
            }
        });

        var handleUpdateMessage = function (e) {
            // 在这里可以检测到 service worker 文件的更新，通常我们建议做页面的 reload
            // 在使用浏览器开发调试工具时，需要关闭"Update on reload"选项，否则会出现持续刷新现象
            location.reload();
        };
    }
})(window);

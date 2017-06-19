/**
 * @file client entry
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

import FastClick from 'fastclick';
import {createApp} from './app';

import 'normalize.css';
import '@/assets/styles/global.styl';

FastClick.attach(document.body);

const {app, router, store} = createApp();

// 同步服务端状态
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    app.$mount('#app');
});

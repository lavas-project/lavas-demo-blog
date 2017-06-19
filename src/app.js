/**
 * @file entry
 * @author chenqiushi(chenqiushi@baidu.com)
 */

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueTouch from 'vue-touch';
import App from './App.vue';
import {createRouter} from './router.js';
import store from './store';
import './svg';
import * as filters from './filters';

Vue.use(Vuetify);

// 基于hammer.js的手势库
Vue.use(VueTouch);

// 注册filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */

export function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        store,
        ...App
    });
    return {app, router, store};
}

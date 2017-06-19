/**
 * @file store index
 * @author zoumiaojiang(zoumiaojiang@gmail.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {store as appShell} from '@/app-shells';
import user from './modules/user';
import news from './modules/news';
import newsList from './modules/newsList';

// 生产环境使用cdn，此时引入vuex会自动注册，无需调用
if (process.env.NODE_ENV !== 'production') {
    Vue.use(Vuex);
}

export default new Vuex.Store({
    getters: {},
    modules: {
        appShell,
        user,
        news,
        newsList
    }
});

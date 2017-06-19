/**
 * @file store index
 * @author chenqiushi(chenqiushi@baidu.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {store as appShell} from '@/app-shells';

// 生产环境使用cdn，此时引入vuex会自动注册，无需调用
if (process.env.NODE_ENV !== 'production') {
    Vue.use(Vuex);
}

export default new Vuex.Store({
    getters: {},
    modules: {
        appShell
    }
});

/**
 * @file store index
 * @author chenqiushi(chenqiushi@baidu.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appShell from './modules/app-shell';

// 生产环境使用 cdn，此时引入 vuex 会自动注册，无需调用
if (process.env.NODE_ENV !== 'production') {
    Vue.use(Vuex);
}

export default new Vuex.Store({
    modules: {
        appShell
    }
});

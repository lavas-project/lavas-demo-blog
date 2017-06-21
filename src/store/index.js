/**
 * @file store index
 * @author chenqiushi(chenqiushi@baidu.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appShell from './modules/app-shell';
import blog from './modules/blog';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appShell,
        blog
    }
});

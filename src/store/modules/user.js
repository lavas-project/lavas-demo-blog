/**
 * @file products
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        user: {}
    },
    getters: {
        user: state => state.user
    },
    actions: {
        async getUserInfo({commit}, userId) {
            try {
                let userInfo = await API.getUserInfo(userId);
                commit(types.SET_USER, userInfo);
            }
            catch (e) {}
        }
    },
    mutations: {
        [types.SET_USER](state, user) {
            state.user = user;
        }
    }
};

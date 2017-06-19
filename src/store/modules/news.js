/**
 * @file products
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        hotNews: [],
        query: {
            history: [
                '历史记录1',
                '历史记录2'
            ],
            result: []
        }
    },
    getters: {
        hotNews: state => state.hotNews,
        searchHistory: state => state.query.history,
        searchResult: state => state.query.result
    },
    actions: {
        async getHotNews({commit}) {
            try {
                commit(types.SET_HOT_NEWS, await API.getHotNews());
            }
            catch (e) {}
        },
        async searchNews({commit}, query) {
            try {
                commit(types.ADD_QUERY_HISTORY, query);
                commit(types.SET_QUERY_RESULT, await API.searchNews(query));
            }
            catch (e) {}
        },
        deleteQueryHistory({commit}, query) {
            commit(types.DELETE_QUERY_HISTORY, query);
        }
    },
    mutations: {
        [types.SET_HOT_NEWS](state, {news}) {
            state.hotNews = news;
        },
        [types.ADD_QUERY_HISTORY](state, query) {
            if (state.query.history.indexOf(query) === -1) {
                state.query.history.push(query);
            }
        },
        [types.DELETE_QUERY_HISTORY](state, query) {
            let queryIdx = state.query.history.indexOf(query);
            if (queryIdx > -1) {
                state.query.history.splice(queryIdx, 1);
            }
        },
        [types.SET_QUERY_RESULT](state, {news}) {
            state.query.result = news;
        }
    }
};

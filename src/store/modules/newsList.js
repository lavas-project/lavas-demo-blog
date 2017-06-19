/**
 * @file products
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        newsList: [],
        topicList: [],
        bannerList: [],
        newsDetail: {},
        category: '',
        loaded: false
    },
    getters: {
        newsList: state => state.newsList,
        newsDetail: state => state.newsDetail,
        topicList: state => state.topicList,
        bannerList: state => state.bannerList,
        category: state => state.category,
        tab: state => state.tab,
        loaded: state => state.loaded
    },
    actions: {
        async getNewsList({commit}, params) {
            try {
                let {news, banner, topic} = await API.getNewsList(params);
                commit(types.SET_NEWS_LIST, {news, banner, topic, change: params.change});
            }
            catch (e) {}
        },
        getNewsDetail({commit}, {nid, type}) {
            commit(types.SET_NEWS_DETAIL, {nid, type});
        },
        checkTabCategory({commit}, category) {
            commit(types.SET_NEWS_CATEGORY, category);
        }
    },
    mutations: {
        [types.SET_NEWS_LIST](state, {news, topic, banner, change}) {
            let content = [];

            news.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();

                if (!content.length && item.content.length) {
                    content = item.content;
                }
                item.content = item.content.length ? item.content : content;
            });

            if (topic) {
                topic.map(item => {
                    let time = new Date(Number(item.ts) || Date.now());
                    item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                        + time.getDay() + ' ' + time.getHours() + ':'
                        + time.getMinutes();
                    if (!content.length && item.content.length) {
                        content = item.content;
                    }
                    item.content = item.content.length ? item.content : content;
                });
            }

            banner.map(item => {
                if (!content.length && item.content.length) {
                    content = item.content;
                }
                item.content = item.content.length ? item.content : content;
            });

            if (news && news.length) {
                if (change) {
                    state.newsList = news;
                }
                else {
                    state.newsList = state.newsList.concat(news);
                }
                state.loaded = 'loaded';
            }
            else {
                state.loaded = 'complete';
            }

            state.topicList = topic;
            state.bannerList = banner;

        },
        [types.SET_NEWS_DETAIL](state, {nid, type}) {
            state.newsList.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.show = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });

            if (type === 'banner') {
                if (state.bannerList && state.bannerList.length) {
                    state.bannerList.forEach(news => {
                        if (news.nid === nid) {
                            state.newsDetail = news;
                        }
                    });
                    if (!state.newsDetail.nid) {
                        state.newsDetail = state.bannerList[0];
                    }
                    state.loaded = 'loaded';
                }
                else {
                    state.loaded = 'complete';
                }
            }
            else {
                if (state.newsList && state.newsList.length) {
                    state.newsList.forEach(news => {
                        if (news.nid === nid) {
                            state.newsDetail = news;
                        }
                    });
                    if (!state.newsDetail.nid) {
                        state.newsDetail = state.newsList[0];
                    }
                    state.loaded = 'loaded';
                }
                else {
                    state.loaded = 'complete';
                }
            }

        },
        [types.SET_NEWS_CATEGORY](state, category) {
            state.category = category;
        }
    }
};

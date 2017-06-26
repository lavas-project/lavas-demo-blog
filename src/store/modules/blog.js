/**
 * @file blog store
 * @author chenqiushi
 */

import * as types from '../mutation-custom-types';
import axios from 'axios';

export default {
    state: {
        blogList: [],
        loadingStatus: false,
        blogDetail: {},
        blogSearchList: []
    },
    getters: {
        blogList(state) {
            return state.blogList;
        },
        loadingStatus(state) {
            return state.loadingStatus;
        },
        blogDetail(state) {
            return state.blogDetail;
        },
        blogSearchList(state) {
            return state.blogSearchList;
        }
    },
    actions: {
        async getBlogList({commit}, params) {
            let type = params.type || 1;
            try {
                let res = await axios(`./api/blogLists/blogList_${type}.json`, {
                    method: 'get'
                });

                if (res.status === 200) {
                    let blogs = res.data.blogs;
                    commit(types.SET_BLOG_LIST, {blogs, params});
                }
            }
            catch (e) {}
        },
        async getBlogDetail({commit}, params) {
            let id = params.id;

            try {
                let res = await axios(`./api/blogDetails/blogDetail_${id}.json`, {
                    method: 'get'
                });

                if (res.status === 200) {
                    let blogDetail = res.data.blogDetail;
                    commit(types.SET_BLOG_DETAIL, {blogDetail});
                }
            }
            catch (e) {}
        },
        async getBlogSearchList({commit}, params) {
            try {
                let res = await axios('./api/blogSearchList.json', {
                    method: 'get'
                });

                if (res.status === 200) {
                    let blogs = res.data.blogs;
                    commit(types.SET_BLOG_SEARCH_LIST, {
                        blogs,
                        isNewSearch: params.isNewSearch
                    });
                }
            }
            catch (e) {}
        }
    },
    mutations: {
        [types.SET_BLOG_LIST](state, {blogs, params}) {
            blogs.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.time = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });

            if (blogs.length) {
                if (params.change) {
                    state.blogList = blogs;
                }
                else {
                    state.blogList = state.blogList.concat(blogs);
                }

                state.loadingStatus = 'loaded';
            }
            else {
                state.loadingStatus = 'complete';
            }
        },
        [types.SET_BLOG_DETAIL](state, {blogDetail}) {
            let time = new Date(Number(blogDetail.ts) || Date.now());
            blogDetail.time = time.getFullYear() + '-' + time.getMonth() + '-'
                + time.getDay() + ' ' + time.getHours() + ':'
                + time.getMinutes();

            state.blogDetail = blogDetail;
        },
        [types.SET_BLOG_SEARCH_LIST](state, {blogs, isNewSearch}) {
            blogs.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.time = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });

            if (blogs.length) {
                if (isNewSearch) {
                    state.blogSearchList = blogs;
                }
                else {
                    state.blogSearchList = state.blogSearchList.concat(blogs);
                }
                // state.loadingStatus = 'loaded';
            }
            else {
                // state.loadingStatus = 'complete';
            }
        }
    }
};

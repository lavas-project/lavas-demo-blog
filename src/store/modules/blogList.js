/**
 * @file blogList store
 * @author chenqiushi
 */

import * as types from '../mutation-custom-types';
import API from '@/api';

export default {
    state: {
        blogList: [],
        loadingStatus: false,
        blogDetail: {}
    },
    getters: {
        blogList: state => state.blogList,
        loadingStatus: state => state.loadingStatus,
        blogDetail: state => state.blogDetail
    },
    actions: {
        async getBlogList({commit}, params) {
            try {
                let {blogs} = await API.getBlogList(params);
                commit(types.SET_BLOG_LIST, {blogs});
            }
            catch (e) {}
        },
        async getBlogDetail({commit}, params) {
            try {
                let {blogDetail} = await API.getBlogDetail(params);
                commit(types.SET_BLOG_DETAIL, {blogDetail});
            }
            catch (e) {}
        }
    },
    mutations: {
        [types.SET_BLOG_LIST](state, {blogs}) {
            blogs.map(item => {
                let time = new Date(Number(item.ts) || Date.now());
                item.time = time.getFullYear() + '-' + time.getMonth() + '-'
                    + time.getDay() + ' ' + time.getHours() + ':'
                    + time.getMinutes();
            });

            if (blogs.length) {
                state.blogList = state.blogList.concat(blogs);
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
        }
    }
}
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
                let res = await axios('./api/blogList.json', {
                    method: 'get'
                });

                if (res.status === 200) {
                    let blogs = res.data.blogs;
                    commit(types.SET_BLOG_LIST, {blogs});
                }
            }
            catch (e) {}
        },
        async getBlogDetail({commit}, params) {
            try {
                let res = await axios('./api/blogDetail.json', {
                    method: 'get'
                });

                if (res.status === 200) {
                    let blogDetail = res.data.blogDetail;
                    commit(types.SET_BLOG_DETAIL, {blogDetail});
                }
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
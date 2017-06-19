/**
 * @file 获取 newsList
 * @author sfe
 */

import axios from 'axios';

export default {
    async getNewsList(params) {
        let data = await axios('https://pwa.baidu.com/api/mockup/news/' + params.category, {
            withCredentials: true
        });

        if (params.nid) {
            let news = data.data.data.news || [];
            data.data.data.news = news.filter(item => item.nid === params.nid) || news[0] || [];
        }

        return data.data.data;
    },

    getUserInfo(userId = '2459115') {
        return new Promise(resolve => {
            resolve({
                userName: 'Baidu',
                messageCount: 10
            });
        });
    },

    getHotNews() {
        return new Promise(resolve => {
            resolve({
                news: [
                    {
                        title: '习近平将访哈萨克斯坦并出席系列活动',
                        abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                        ts: '1496806231000',
                        url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                    },
                    {
                        title: '习近平将访哈萨克斯坦并出席系列活动',
                        abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                        ts: '1496806231000',
                        url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                    },
                    {
                        title: '习近平将访哈萨克斯坦并出席系列活动',
                        abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                        ts: '1496806231000',
                        url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                    }
                ]
            });
        });
    },
    searchNews(query) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    news: [
                        {
                            title: '习近平将访哈萨克斯坦并出席系列活动',
                            abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                            ts: '1496806231000',
                            url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                        },
                        {
                            title: '习近平将访哈萨克斯坦并出席系列活动',
                            abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                            ts: '1496806231000',
                            url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                        },
                        {
                            title: '习近平将访哈萨克斯坦并出席系列活动',
                            abs: '本次活动观澜山水国画产业基地以“水墨艺术衍生”为主线，围绕“创意水墨˙艺术生活”主题，通过多元...',
                            ts: '1496806231000',
                            url: 'http://www.sznews.com/news/content/2016-12/18/content_14606309.htm'
                        }
                    ]
                });
            }, 1500);
        });
    }

};

<template>
    <div class="news-wrapper">
        <!-- 列表部分list组件，后面提出来 -->
        <div class="news-list">
            <div v-for="news in newsList" class="news-item" @click="getDetail(news.nid, news.url, news.content.length)">

                <!-- 仅一张图时的样式 -->
                <div v-if="news.imageurls.length === 1" class="img-first news-content" >
                    <div class="posts" v-if="news.imageurls.length">
                        <span v-for="imgUrl in news.imageurls">
                            <img :src="imgUrl.url" alt="">
                        </span>
                    </div>
                    <div class="right-part">
                        <div class="list-item-title">{{news.title}}</div>
                        <div class="some-icons">
                            <span class="update-time">{{news.show}}</span>
                            <span class="icons">{{news.site}}</span>
                        </div>
                    </div>
                </div>

                <!-- 非一张图时的样式 -->
                <div v-if="news.imageurls.length !== 1" class="title-first news-content">
                    <div class="list-item-title">{{news.title}}</div>
                    <div class="posts" v-if="news.imageurls.length">
                        <span v-for="imgUrl in news.imageurls">
                            <img :src="imgUrl.url" alt="">
                        </span>
                    </div>
                    <div class="some-icons">
                        <span class="update-time">{{news.show}}</span>
                        <span class="icons">{{news.site}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';

export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    props: ['newsList'],
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'category',
            'newsDetail'
        ])
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'getNewsDetail',
            'setPageLoading'
        ]),

        // 查看详情
        async getDetail (nid, url, contentLength) {
            if (!contentLength) {
                location.href = url;
            }
            else {
                this.setPageLoading(true);
                this.getNewsDetail({nid, type: 'news'});
                this.$router.push('/detail/?type=news&nid=' + nid + '&category=' + this.category);
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
a
    text-decoration none

.news-wrapper
    // min-height 200px

    .news-list
        padding 10px

        .news-item
            font-size 16px
            padding 10px
            line-height 16px
            border-bottom 1px solid #eee

            .news-content
                display inline-block
                width 100%

                .list-item-title
                    font-size 18px
                    line-height 26px
                    color #333
                .posts
                    margin-top 5px
                    span
                        display inline-block
                        margin-right 2%
                        max-height 111px
                        width 32%
                        img
                            width 100%
                            display inline-block
                        &:last-child
                            margin-right 0
                .some-icons
                    color #ccc
                    margin-right 3%
                    margin-top 3px
                    font-size 12px
                    .icons
                        color #ef3f41
                        border 1px solid #efb9b9

            .img-first
                .right-part
                    width 66%
                    float right
                    padding-left 10px

                .posts
                    width 34%
                    display inline-block
                    span
                        width 100%
                        img
                            width 100%

</style>

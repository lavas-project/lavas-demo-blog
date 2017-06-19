<template>
    <div class="news-detail-wrapper">
        <h3>{{detail.title}}</h3>

        <div class="title-info">
            <span>{{detail.site}}</span>
            <span>{{detail.show}}</span>
        </div>

        <div class="content">
            <div v-for="content in contents" class="news-item">
                <p v-if="content.type === 'text'">{{ content.data }}</p>
                <img v-if="content.type === 'image'" :src="content.data.original.url"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import types from '@/store/mutation-types';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';

export default {
    name: 'detail',
    mixins: [pageLoadingMixin],
    computed: {
        ...mapGetters([
            'newsDetail',
            'newsList',
            'bannerList'
        ]),
        detail: function() {
            return this.newsDetail || {};
        },
        contents: function() {
            return this.newsDetail && this.newsDetail.content || [];
        }
    },
    props: {},
    data() {
        return {
            nid: '',
            type: ''
        }
    },
    methods: {
        ...mapActions([
            'setAppHeader',
            'hideMenuTabs',
            'setPageLoading',
            'getNewsList',
            'getNewsDetail'
        ])
    },
    async activated() {
        let nid = this.nid = this.$route.query.nid;
        let type = this.type = this.$route.query.type;
        let category = this.category = this.$route.query.category;

        this.setAppHeader({
            title: '',
            show: true,
            showMenu: false,
            showBack: true,
            showLogo: false,
            actions: [
                {
                    icon: 'home',
                    route: {
                        name: 'home'
                    }
                }
            ]
        });
        this.hideMenuTabs();
        this.setPageLoading(true);

        if (type === 'news' && this.newsList.length === 0) {
            await this.getNewsList({
                category
            });
            this.getNewsDetail({nid, type});
        }
        else if (type === 'banner' && this.bannerList.length === 0) {
            await this.getNewsList({
                category
            });
            this.getNewsDetail({nid, type});
        }

        // 设置页面标题
        // this.setAppHeader({
        //     title: this.detail.title
        // });

        this.setPageLoading(false);
    }
};
</script>

<style lang="stylus" scoped>

.news-detail-wrapper
    padding 20px
    min-height 200px
    h3
        font-size 24px
        line-height 36px
        font-weight bold
        marigin-bottom 20px

    .title-info
        margin-bottom 20px
        font-size 13px
        color #999
        span
            margin-right 10px

    .content
        line-height 27px
        font-size 18px
        p
            margin-top 10px
            text-indent 32px
        img
            width 100%
            height 100%


</style>

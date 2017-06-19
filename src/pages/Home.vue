<template>
    <div class="home-wrapper">
        <div class="news-wrapper">

            <!-- 轮播banner组件 -->
            <ui-carousel :items="bannerList"></ui-carousel>
            <!-- 列表部分list组件 -->
            <home-news-list :newsList='topicList'></home-news-list>

            <home-news-list :newsList='newsList'></home-news-list>
            <infinite-loading :on-infinite="getMoreNews" ref="infiniteLoading">
                <span slot="no-more">
                  没有更多了！
                </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import HomeNewsList from '@/components/HomeNewsList.vue';
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';
import uiCarousel from '@/components/ui/carousel';
import InfiniteLoading from 'vue-infinite-loading';

let isFirst = false;

export default {
    name: 'home',
    mixins: [pageLoadingMixin],
    props: {
    },
    components: {
        uiCarousel,
        HomeNewsList,
        InfiniteLoading
    },
    computed: {
        ...mapGetters([
            'newsList',
            'topicList',
            'bannerList',
            'category',
            'loaded'
        ])
    },

    data() {
        return {
            path: '/'
        };
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'setAppHeader',
            'getNewsList',
            'showMenuTabs',
            'checkTabCategory'
        ]),
        async getMoreNews() {
            const category = this.$route.query.category || 'remen';
            await this.getNewsList({
                category: category,
                change: false,
                pageNum: Math.floor(this.newsList.length / 20),
                pageSize: 20
            });
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loaded);
        }
    },
    watch: {
        async category(newC, oldC) {
            if (!oldC) {
                return;
            }
            await this.getNewsList({
                category: this.category,
                change: true,
                pageNum: 0,
                pageSize: 20
            });
            this.setPageLoading(false);

        }
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '',
            showMenu: false,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                },
                {
                    icon: 'person',
                    route: '/user'
                }
            ]
        });
        this.setPageLoading(false);
        this.showMenuTabs();
        this.checkTabCategory(this.$route.query.category || 'remen');
        if (this.category === 'remen') {
            this.getMoreNews();
        }
    }
};
</script>

<style lang="stylus" scoped>
.home-wrapper
    margin-top 92px !important;
</style>

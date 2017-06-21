<template>
    <div class="home-wrapper">
        <div class="blogs-wrapper">
            <home-blog-list :blogList="blogList"></home-blog-list>
            <infinite-loading :on-infinite="getMoreBlogs" ref="infiniteLoading">
                <span slot="no-more">
                  没有更多了！
                </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import InfiniteLoading from 'vue-infinite-loading';
import HomeBlogList from '@/components/HomeBlogList.vue'

export default {
    name: 'home',
    props: {},
    components: {
        HomeBlogList,
        InfiniteLoading
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'blogList',
            'loadingStatus'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions([
            'getBlogList'
        ]),
        async getMoreBlogs() {
            await this.getBlogList({
                pageNum: Math.floor(this.blogList.length / 10),
                pageSize: 10
            });
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loadingStatus);
        }
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: 'Tom 的博客',
            showMenu: true,
            showBack: false,
            showLogo: true,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });

        this.getMoreBlogs();
    }
};
</script>

<style lang="stylus" scoped>
</style>

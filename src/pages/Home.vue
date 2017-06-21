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
            let type = this.$route.query.type || '';

            await this.getBlogList({
                type,
                pageNum: Math.floor(this.blogList.length / 10),
                pageSize: 10
            });

            this.$refs.infiniteLoading.$emit('$InfiniteLoading:' + this.loadingStatus);
        }
    },
    watch: {
        '$route.query.type': function (type) {
            document.body.scrollTop = 0;

            this.getBlogList({
                type,
                change: true,
                pageNum: 0,
                pageSize: 10
            });
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

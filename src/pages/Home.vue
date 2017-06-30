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
import InfiniteLoading from 'vue-infinite-loading';
import HomeBlogList from '@/components/HomeBlogList.vue';

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
            'loadingStatus',
            'homeScrollTop'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions([
            'getBlogList',
            'saveHomeScrollTop'
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
        ['$route.query.type'](type) {
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
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            document.body.scrollTop = vm.homeScrollTop || 0;
        });
    },
    beforeRouteLeave(to, from, next) {
        this.saveHomeScrollTop(document.body.scrollTop);
        next();
    }
};
</script>

<style lang="stylus" scoped>
</style>

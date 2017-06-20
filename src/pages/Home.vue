<template>
    <div class="home-wrapper">
        <div class="blogs-wrapper">
            <home-blog-list :blogList="blogList"></home-blog-list>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import EventBus from '@/event-bus';
import HomeBlogList from '@/components/HomeBlogList.vue'

export default {
    name: 'home',
    props: {},
    components: {
        HomeBlogList
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'blogList'
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
                pageNum: Math.floor(this.blogList.length /20),
                pageSize: 10
            });
        }
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: 'Blog',
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

<template>
    <div class="app-search-page">
        <header>
            <v-btn light icon class="search-btn" @click.native="$router.go(-1)">
                <v-icon class="search-icon">arrow_back</v-icon>
            </v-btn>
            <form @submit.prevent="search">
                <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off" />
            </form>
            <v-btn light icon class="search-btn" @click.native="query = ''">
                <v-icon class="search-icon">close</v-icon>
            </v-btn>
        </header>
        <div v-if="loading" class="search-loading">
            <v-progress-circular indeterminate v-bind:size="70" class="primary--text"></v-progress-circular>
        </div>
        <div v-if="blogSearchList && blogSearchList.length" class="search-content">
            <div class="blog-list">
                <div v-for="blog in blogSearchList" class="blog-item" @click="openDetail(blog.id)">
                    <div class="title">{{blog.title}}</div>
                    <p class="abstract">{{ blog.abs}}</p>
                    <div class="time">发布时间：{{ blog.time }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'search',
    data() {
        return {
            query: '',
            loading: false,
            data: []
        };
    },
    computed: {
        ...mapGetters([
            'blogSearchList'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ]),
        ...mapActions([
            'getBlogSearchList'
        ]),
        async search() {
            // 把数据清空
            this.data = [];
            // 显示加载动画
            this.loading = true;
            // 让当前输入框失去焦点
            this.$el.querySelector('.search-input').blur();

            // 等待 1s，模拟加载中的效果
            await this.getBlogSearchList({
                pageNum: Math.floor(this.blogSearchList.length / 20),
                pageSize: 20,
                isNewSearch: true
            });

            this.loading = false;
        },
        // 查看详情
        async openDetail(blogId) {
            this.$router.push('/detail/' + blogId);
        }
    },
    activated() {
        this.setAppHeader({show: false});
        this.hideBottomNav();
    }
};
</script>

<style lang="stylus" scoped>

header
    display flex
    align-items center
    height 52px
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)

form
    flex 1

.search-input
    width 100%
    outline none
    font-size 16px
    height 50px

.search-btn
    color #959595

.search-loading
    margin-top 30%
    display flex
    justify-content center

.search-content
    margin-top 20px

li
    list-style-type none

.blog-list
    padding 0 15px
    .blog-item
        padding-bottom 20px
        border-bottom 1px solid #eee
        .title
            font-weight 700
            font-size 21px
            line-height 30px
            margin 30px 0 15px 0
        .abstract
            font-size 14px
            color #9f9f9f
            margin-bottom 10px
            display -webkit-box
            overflow hidden
            text-overflow ellipsis
            -webkit-box-orient vertical
            -webkit-line-clamp 5
        .time
            color #808080
</style>

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
        <div v-if="data && data.length" class="search-content">
            <v-list two-line>
                <v-list-item v-for="(item, index) in data" v-bind:key="item.title">
                    <v-list-tile avatar ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.headline }}</v-list-tile-sub-title>
                            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                            <v-icon class="grey--text text--lighten-1">star_border</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider light v-if="index + 1 < data.length"></v-divider>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import types from '@/store/mutation-types';

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
            searchBlogList
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
            await getBlogSearchList({
                pageNum: Math.floor(this.searchBlogList.length / 20),
                pageSize: 20,
                isNewSearch: true
            });

            this.loading = false;
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
</style>

<template>
    <div class="app-search-page">
        <header>
            <v-btn light icon @click.native="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <morph-search
                class="search-wrapper"
                :history="searchHistory"
                @search="handleSearch"
                @delete-history="handleDeleteHistory"></morph-search>
        </header>

        <div class="result-wrapper">
            <transition name="slide-left">
                <v-card class="result-card" v-show="searchResult && searchResult.length">
                    <v-card-row class="blue darken-4">
                        <v-card-title>
                            <v-icon class="red--text text--lighten-1">search</v-icon>
                            <span class="white--text">“{{lastQuery}}”的搜索结果</span>
                        </v-card-title>
                    </v-card-row>
                    <v-card-text>
                        <v-list two-line>
                            <v-list-item v-for="(item, index) in searchResult" v-bind:key="index">
                                <v-list-tile avatar ripple>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                        <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.abs }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-list-tile-action-text class="news-date">{{ item.ts | formatDateToNow }}</v-list-tile-action-text>
                                        <v-icon class="grey--text text--lighten-1">star_border</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </transition>

            <v-card class="result-card">
                <v-card-row class="blue darken-4">
                    <v-card-title>
                        <v-icon class="red--text text--lighten-1">whatshot</v-icon>
                        <span class="white--text">热搜榜</span>
                    </v-card-title>
                </v-card-row>
                <v-card-text>
                    <v-list two-line v-show="hotNews && hotNews.length">
                        <v-list-item v-for="(item, index) in hotNews" v-bind:key="index">
                            <v-list-tile avatar ripple>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.abs }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-list-tile-action-text class="news-date">{{ item.ts | formatDateToNow }}</v-list-tile-action-text>
                                    <v-icon class="grey--text text--lighten-1">star_border</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import types from '@/store/mutation-types';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';
import MorphSearch from '@/components/MorphSearch';

export default {
    name: 'search',
    components: {
        MorphSearch
    },
    mixins: [pageLoadingMixin],
    computed: {
        ...mapGetters([
            'hotNews',
            'searchHistory',
            'searchResult'
        ])
    },
    data() {
        return {
            lastQuery: ''
        };
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'setAppHeader',
            'getHotNews',
            'searchNews',
            'deleteQueryHistory',
            'hideMenuTabs'
        ]),
        async handleSearch(query) {
            this.setPageLoading(true);
            await this.searchNews(query);
            this.lastQuery = query;
            this.setPageLoading(false);
        },
        handleDeleteHistory(historyItem) {
            this.deleteQueryHistory(historyItem);
        }
    },
    activated() {
        this.setAppHeader({show: false});
        this.setPageLoading(false);
        this.hideMenuTabs();
    },
    async mounted() {
        await this.getHotNews();
    }
};
</script>

<style lang="stylus" scoped>

.app-search-page
    background #eee !important

    header
        display flex
        align-items center
        height $app-header-height
        background: $theme.primary
        box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)

        .search-wrapper
            flex 1

    .result-wrapper
        padding 6px

        .result-card
            background: $material-theme.bg-color
            margin-bottom 6px
            transition transform 0.2s ease-in-out
            transform translate3d(0,0,0)

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-right-enter
                transform translate(-100%, 0)

            &.slide-right-leave-active
                transform translate(100%, 0)

            &.slide-left-leave-active
                transform translate(-100%, 0)

            .card__row
                height $app-header-height
                .card__title
                    font-size 16px
                    padding 12px 16px
            .card__text
                padding 0

                .news-date
                    text-align right
                    white-space normal


</style>

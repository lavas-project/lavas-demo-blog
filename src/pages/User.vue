<template>
    <div class="app-user-page">
        <div class="app-user-title text-xs-center">
            <div class="user-avatar">
                <p>
                    <v-icon light class="user-avatar-icon">face</v-icon>
                </p>
                <p v-cloak>{{ user.userName }}</p>
            </div>

            <v-list two-line>
                <v-list-item>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-icon>message</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>我的消息</v-list-tile-title>
                            <v-list-tile-sub-title></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <span class="user-item-count">{{ user.messageCount }}</span>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-item>
                <v-divider inset></v-divider>
                <v-list-item>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-icon>star</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>我的收藏</v-list-tile-title>
                            <v-list-tile-sub-title></v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <span class="user-item-count">{{ user.messageCount }}</span>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import types from '@/store/mutation-types';
import pageLoadingMixin from '@/mixins/pageLoadingMixin';

export default {
    name: 'user',
    mixins: [pageLoadingMixin],
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions([
            'setPageLoading',
            'setAppHeader',
            'getUserInfo',
            'hideMenuTabs'
        ])
    },
    activated() {
        this.setAppHeader({
            show: true,
            title: '个人中心',
            showMenu: false,
            showBack: true,
            showLogo: false,
            actions: [
                {
                    icon: 'search',
                    route: '/search'
                }
            ]
        });
        // 关闭加载中动画
        this.setPageLoading(false);
        this.hideMenuTabs();
    },
    async mounted() {
        await this.getUserInfo();
    }
};
</script>

<style lang="stylus" scoped>

.user-avatar
    color #333
    margin 50px auto 20px
    display flex
    justify-content center
    flex-direction column

    &-icon
        width 100px
        height 100px
        border-radius 100px
        background #666
        font-size 80px

.user-item-count
    height 24px
    width 24px
    border-radius 24px
    background #ccc
    font-size 14px
    line-height 24px
    color #fff
    font-weight bold
    vertical-align middle

</style>

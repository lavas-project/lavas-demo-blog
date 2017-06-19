<template>
    <div class="app-shell app-shell-bottom-navigation">
        <div class="app-shell-header">
            <app-header
                :show="appHeader.show"
                :isRefresh="appHeader.isRefresh"
                :showMenu="appHeader.showMenu"
                :showBack="appHeader.showBack"
                :showLogo="appHeader.showLogo"
                :title="appHeader.title"
                :actions="appHeader.actions"
                :loading="isPageSwitching"
                @click-logo="handleClickHeaderLogo"
                @click-back="handleClickHeaderBack">
                <template slot="logo">
                    <span class="app-header-logo">新闻 - news</span>
                </template>
            </app-header>
            <app-menu-tabs :entrys="menuTabs.tabs" :show="menuTabs.show"></app-menu-tabs>
        </div>
        <div class="app-view-wrapper">
            <v-progress-circular
                indeterminate
                :size="50"
                v-show="isPageLoading"
                class="app-view-loading"/>
            <transition
                :name="pageTransitionName"
                @before-enter="handleBeforeEnter"
                @after-enter="handleAfterEnter">
                <keep-alive>
                    <router-view
                        v-if="!$route.meta.notKeepAlive"
                        class="app-view"
                        :class="{
                            'app-view-with-header': appHeader.show
                        }"></router-view>
                </keep-alive>
            </transition>
            <transition
                :name="pageTransitionName"
                @before-enter="handleBeforeEnter"
                @after-enter="handleAfterEnter">
                <router-view
                    v-if="$route.meta.notKeepAlive"
                    class="app-view"
                    :class="{
                        'app-view-with-header': appHeader.show
                    }"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import AppHeader from './components/appHeader';
import AppMenuTabs from './components/appMenuTabs';

export default {
    name: 'bottomNavigation',
    components: {
        AppHeader,
        AppMenuTabs
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'appHeader',
            'menuTabs',
            'isPageLoading',
            'isPageSwitching',
            'pageTransitionName'
        ])
    },
    methods: {
        ...mapActions([
            'setPageSwitching'
        ]),
        handleBeforeEnter() {
            this.setPageSwitching(true);
        },
        handleAfterEnter() {
            this.setPageSwitching(false);
        },
        handleClickHeaderBack() {
            this.$router.go(-1);
        },
        handleClickHeaderLogo() {
            this.$router.push('/');
        }
    }
};
</script>

<style lang="stylus" scoped>

.app-shell
    display flex
    flex-direction column

    .app-refresh-tips
        background #000
        color #fff
        height 40px
        line-height 40px
        padding 0 20px
        .app-refresh-wrap
            display flex
        span
            display inline-block
            flex 1
            font-size 15px
        button
            color #fff
            outline none
            font-size 15px

    .app-shell-header
        position fixed
        top 0
        left 0
        right 0
        z-index 1000

        .app-header-logo
            padding-left 16px
            font-size 1.2em

    .app-shell-footer
        position fixed
        bottom 0
        left 0
        right 0
        z-index 1000

    .app-view-wrapper
        flex 1
        position relative

        .app-view-loading
            position fixed
            top 50%
            left 50%
            transform translate(-50%, -50%)
            z-index 100
            color: $theme.primary
        .app-view
            position absolute
            width 100%
            margin-top 0
            transition transform 0.4s cubic-bezier(.55, 0, .1, 1)
            background: $material-theme.bg-color
            color: $material-theme.text-color

            &.app-view-with-header
                margin-top $app-header-height

            // &.app-view-with-footer
            //     bottom $app-footer-height

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-right-enter
                transform translate(-100%, 0)

            &.slide-right-leave-active
                transform translate(100%, 0)

            &.slide-left-leave-active
                transform translate(-100%, 0)

</style>

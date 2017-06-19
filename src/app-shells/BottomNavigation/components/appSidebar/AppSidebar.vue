<template>
    <div class="app-sidebar-wrapper">
        <!-- 引入app-mask组件-->
        <app-mask
            :show="show"
            @close-mask="closeAppSidebar"
        ></app-mask>

        <!-- sidebar 内容部分 -->
        <transition :name="slideFrom">
            <div v-show="show" v-bind:class="[{'app-sidebar-show': show}, {'app-sidebar-slide-right': (slideFrom === 'slide-right')}, 'app-sidebar-content']">
                <!-- 头部 -->
                <div v-if="title" class="app-sidebar-title" @click.stop="closeAppSidebar">
                    <span class="app-sidebar-title-left-icon">
                        <img v-if="title.imageLeft" :src="title.imageLeft" :alt="title.altLeft" />
                        <icon v-else-if="title.svgLeft" :name="title.svgLeft"></icon>
                        <v-icon light v-else-if="title.iconLeft">{{ title.iconLeft }}</v-icon>
                    </span>
                    <span>{{ title.text }}</span>
                    <slot name="logo1" class="app-sidebar-title-right-logo">
                        <span class="app-sidebar-title-right-logo">
                            <img v-if="title.imageRight" :src="title.imageRight" :alt="title.altRight" />
                            <icon v-else-if="title.svgRight" :name="title.svgRight"></icon>
                            <v-icon v-else-if="title.iconRight">{{ title.iconRight }}</v-icon>
                        </span>
                    </slot>
                </div>

                <!-- 导航列表分区块 -->
                <div v-if="blocks" class="app-sidebar-blocks">
                    <ul>
                        <!-- 单个区块 -->
                        <li v-for="block in blocks" class="app-sidebar-block">
                            <div v-if="block.sublistTitle" class="sub-list-title">{{ block.sublistTitle }}</div>
                            <ul v-if="block.list">
                                <li v-for="item in block.list" @click.stop="closeAndgo(item.route)">
                                    <span v-if="item.icon || item.image || item.svg " class="app-sidebar-block-left-icon">
                                        <img v-if="item.image" :src="item.image" :alt="item.alt" />
                                        <icon v-else-if="item.svg" :name="item.svg"></icon>
                                        <v-icon v-else-if="item.icon">{{ item.icon }}</v-icon>
                                    </span>
<!--                                     <v-btn v-if="item.text" class="app-sidebar-block-text" dark flat>{{ item.text }}</v-btn> -->
                                    <span v-if="item.text" class="app-sidebar-block-text">{{ item.text }}</span>
                                    <!-- <span v-if="item.iconRightImgUrl" class="app-sidebar-block-right-logo"><img :src="item.iconRightImgUrl" alt=""></span> -->
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import AppMask from './AppMask.vue';

export default {
    components: {
        AppMask
    },
    props: {
        show: {
            type: Boolean,
            default: true
        },
        slideFrom: {
            type: String
        },
        title: {
            type: Object
        },
        blocks: {
            type: Array
        }
    },
    methods: {
        closeAppSidebar() {
            this.$emit('close-sidebar');
        },
        closeAndgo(newPage) {
            this.$router.push(newPage);
            this.closeAppSidebar();
        },
        showAppSidebar() {
            this.$emit('show-sidebar');
        }
    }
};
</script>

<style lang="stylus" scoped>

ul,li
    padding 0
    margin 0
    list-style none

a
    text-decoration none
    color #333

.app-sidebar-wrapper
    width 100%
    height 100%
    background transparent
    position fixed
    top 0
    left -100%
    z-index 9999

.app-sidebar-content
    position fixed
    top 0
    left -($app-sidebar-width)%
    height 100%
    width ($app-sidebar-width)%
    background: $material-theme.bg-color
    box-shadow 3px 0 8px 1px rgba(0, 0, 0, 0.4)
    overflow-y auto
    z-index 9999
    transition left .5s ease

    &.app-sidebar-show
        left 0

    .app-sidebar-title-left-icon,
    .app-sidebar-block-left-icon
        display inline-block
        width ($app-sidebar-left-icon-size + 10)px
        height 100%

        img
            vertical-align middle
            width ($app-sidebar-left-icon-size)px
            height ($app-sidebar-left-icon-size)px
        svg
            position relative
            left 0
            top 0
            transform none
            vertical-align middle
            height ($app-sidebar-left-icon-size)px
            width ($app-sidebar-left-icon-size)px

        .material-icons
            font-size ($app-sidebar-left-icon-size)px

    .app-sidebar-block-text
        display inline-block
        height 100%
        vertical-align middle

    .app-sidebar-title-right-logo,
    .app-sidebar-block-right-logo
        float right

        img
            width 20px
            height 20px
            margin-right 10px


    .app-sidebar-title
        color #fff
        padding 0 10px
        font-size 16px
        font-weight bold
        height $app-sidebar-title-height
        line-height $app-sidebar-title-height
        background: $theme.primary

    .app-sidebar-blocks

        .app-sidebar-block
            padding 10px 0
            border-bottom 1px solid #e0e0e0
            color #333

            .sub-list-title
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height
                text-indent ($app-sidebar-left-icon-size + 28)px
                font-weight bold
                color #888

            li
                padding-left 15px
                height $app-sidebar-nav-height
                line-height $app-sidebar-nav-height


                &:last-child
                    border none

            &:last-child
                border-bottom none


    &.slide-left-enter-active,
    &.slide-left-leave-active
        transition left .5s

    &.slide-left-enter
        left -($app-sidebar-width)%

    &.slide-left-leave
        left 0


.app-sidebar-slide-right
    left 100%

    &.app-sidebar-show
        left (100 - $app-sidebar-width)%

    &.slide-right-enter-active,
    &.slide-right-leave-active
        transition left .5s

    &.slide-right-enter
        left 100%

    &.slide-right-leave
        left (100 - $app-sidebar-width)%

</style>

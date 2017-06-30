<template>
    <div class="blog-list-wrapper">
        <!-- 列表部分list组件，后面提出来 -->
        <div class="blog-list">
            <div v-for="blog in blogList" class="blog-item" @click="openDetail(blog.id)">
                <div class="title">{{blog.title}}</div>
                <p class="abstract">{{ blog.abs}}</p>
                <div class="time">发布时间：{{ blog.time }}</div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'homeBlogList',
    props: ['blogList'],
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
        ])
    },
    methods: {
        ...mapActions([
        ]),

        // 查看详情
        async openDetail(blogId) {
            this.$router.push('/detail/' + blogId);
        }
    }
};
</script>

<style lang="stylus" scoped>
a
    text-decoration none

.blog-list
    padding 0 15px
    .blog-item
        padding 10px 0 30px 0
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

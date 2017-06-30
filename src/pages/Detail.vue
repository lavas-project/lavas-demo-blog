<template>
    <div class="detail-wrapper">
        <h3>{{blogDetail.title}}</h3>

        <div class="title-info">
            <span>{{blogDetail.author}}</span>
            <span>{{blogDetail.time}}</span>
        </div>

        <div class="content">
            <div v-for="content in contents" class="news-item">
                <p v-if="content.type === 'text'">{{ content.data }}</p>
                <img v-if="content.type === 'image'" :src="content.data.big.url"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'detail',
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'blogDetail'
        ]),
        contents() {
            return this.blogDetail && this.blogDetail.content || [];
        }
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ])
    },
    async asyncData({store, route}) {
        let id = route.params.id;

        await store.dispatch('getBlogDetail', {id});
    },
    created() {
        this.setAppHeader({
            show: true,
            title: '',
            showMenu: false,
            showBack: true,
            showLogo: false,
            actions: [
                {
                    icon: 'home',
                    route: {
                        name: 'home'
                    }
                }
            ]
        });

        document.body.scrollTop = 0;
    }
};
</script>

<style lang="stylus" scoped>

.detail-wrapper
    padding 20px
    min-height 200px
    h3
        font-size 26px
        line-height 36px
        font-weight 700
        marigin-bottom 20px

    .title-info
        margin-bottom 20px
        font-size 14px
        color #808080
        span
            margin-right 10px

    .content
        line-height 27px
        font-size 14px
        word-wrap break-word
        p
            margin-top 10px
            text-indent 32px
        img
            width 100%
            height 100%


</style>

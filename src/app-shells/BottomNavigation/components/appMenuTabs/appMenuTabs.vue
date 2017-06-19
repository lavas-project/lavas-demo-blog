<template>
    <div class="app-menu-tabs" id="app-menu-tabs" v-show="show">
        <div class="app-menu-tabs-single" v-show="open">
            <div class="app-menu-tabs-con">
                <div
                    class="app-menu-tabs-wrap"
                    :style="{width: this.entrys.length * 72 + 'px'}"
                >
                    <div
                        class="app-menu-tabs-item"
                        v-for="(item,i) in entrys"
                        v-on:click="selectItem(i)"
                    >
                        <span v-bind:class="{active: item.active}">{{item.text}}</span>
                    </div>
                </div>
            </div>
            <div
                class="app-menu-tabs-toggle"
                v-on:click="toggleOpen"
            >
                <v-icon class="app-menu-tabs-icon">keyboard_arrow_down</v-icon>
            </div>
        </div>
        <div class="app-menu-tabs-all" v-show="!open">
            <div class="app-menu-tabs-con">
                <label>切换频道</label>
            </div>
            <div
                class="app-menu-tabs-toggle"
                v-on:click="toggleOpen"
            >
                <v-icon class="app-menu-tabs-icon">keyboard_arrow_up</v-icon>
            </div>
            <div class="app-menu-tabs-list">
                <div
                    class="app-menu-tabs-item"
                    v-for="(item,i) in entrys"
                    v-on:click="selectItem(i)"
                >
                    <span v-bind:class="{active: item.active}">{{item.text}}</span>
                </div>
            </div>
            <div class="app-menu-tabs-mask" v-on:click="toggleOpen"></div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'category',
                'tab'
            ])
        },
        props: {
            entrys: {
                type: Array
            },
            show: true
        },

        data() {
            return {
                open: true
            }
        },

        created() {
            let me = this;
            let category = this.$route.query.category || 'remen';
            me.entrys.forEach((item, i) => {
                me.$set(me.entrys[i], 'active', me.entrys[i].value === category);
            });
        },
        methods: {
            ...mapActions([
                'setPageLoading',
                'checkTabCategory'
            ]),
            toggleOpen() {
                this.open = !this.open;
            },
            async selectItem(index) {

                let me = this;
                me.entrys.forEach((item, i) => {
                    me.$set(me.entrys[i], 'active', i === index);
                });

                if (me.entrys[index].value === this.category) {
                    return;
                }

                if (!this.open) {this.toggleOpen();}
                this.setPageLoading(true);

                await this.checkTabCategory(me.entrys[index].value);

                document.body.scrollTop = 0

                this.$router.push('?category=' + me.entrys[index].value);

            }
        }
    };

</script>


<style lang="stylus" scoped>

$btn-color = #fff

.app-menu-tabs-all
    background: $theme.primary
    border-top 1px solid #5dabf0
    height 40px
    display flex
    position relative

    .app-menu-tabs-item
        width: 12.6667%;
        margin 0 2%

    .app-menu-tabs-mask
        position fixed
        left 0
        right 0
        top 92px
        z-index 500
        bottom 0
        // background rgba(0, 0, 0, .3)

.app-menu-tabs-single
    background: $theme.primary
    border-top 1px solid #5dabf0
    height 40px
    overflow hidden
    display flex

.app-menu-tabs-item
    display inline-block
    height 40px
    line-height 40px
    color $btn-color
    font-size 16px
    width 60px
    text-align center
    margin 0 6px

    span
        display inline-block
        height 38px
        padding 0 4px

    span.active
        border-bottom 2px solid $btn-color

.app-menu-tabs-con
    flex 1
    overflow hidden
    overflow-x auto
    color $btn-color
    height 100px
    label
        height 40px
        line-height 40px
        padding 0 18px
        font-size 16px

.app-menu-tabs-toggle
    display inline-block
    height 40px
    width 40px
    line-height 40px
    text-align center

    .app-menu-tabs-icon
        color $btn-color

.app-menu-tabs-list
    position absolute
    border-top 1px solid #5dabf0
    left 0
    right 0
    top 38px
    background: $theme.primary
    z-index 600
    padding 10px 0 20px 0

</style>

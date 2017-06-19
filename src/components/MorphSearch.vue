<template>
    <div class="search-wrapper" :class="{open: open}">
        <form class="search-form"
            @submit.prevent="search(query)">
            <input class="search-input"
                v-model="query"
                v-focus="focused"
                type="search"
                autocomplete="off"
                placeholder="请输入搜索词"
                autocapitalize="off"
                @focus="handleFocus"
                @blur="focused = false"/>
        </form>
        <v-btn class="close-btn"
            v-show="open"
            icon ripple @click.native="open = false">
            <v-icon class="close-icon">arrow_back</v-icon>
        </v-btn>
        <v-btn class="clear-btn"
            v-show="open"
            icon ripple @click.native="query = ''">
            <v-icon class="clear-icon">close</v-icon>
        </v-btn>
        
        <div class="search-history-wrapper">
            <v-list subheader class="history-list">
                <v-subheader inset>历史记录</v-subheader>
                <v-list-item
                    v-for="historyItem, idx in history"
                    :key="idx"
                    @click="search(historyItem)">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                        <v-icon>search</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ historyItem }}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn 
                                class="grey--text"
                                icon ripple @click.native.stop="deleteHistory(historyItem)">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script>
import {focus} from 'vue-focus';

export default {
    name: 'morphSearch',
    props: {
        history: {
            type: Array
        }
    },
    directives: {
        focus
    },
    data() {
        return {
            open: false,
            query: '',
            focused: false
        };
    },
    methods: {
        search(query) {
            if (query) {
                this.open = false;
                this.focused = false;
                this.query = query;
                this.$emit('search', this.query);   
            }
        },
        deleteHistory(historyItem) {
            this.$emit('delete-history', historyItem);
        },
        handleFocus() {
            this.focused = true;
            this.open = true;
        }
    }
};
</script>

<style lang="stylus" scoped>
.search-wrapper
    display flex
    align-items center
    z-index 999
        
    .search-form
        flex 1
        display flex
        
        .search-input
            flex 1
            outline none
            font-size 16px
            height 50px
            color: $material-theme.bg-color
            +placeholder()
                color: $material-theme.bg-color
    
    .clear-btn
        color: $material-theme.bg-color

    .close-btn
        position absolute
        left 0
        top 2px
        background: $theme.primary
        color: $material-theme.bg-color
        
    .search-history-wrapper
        display none
        position absolute
        top $app-header-height
        bottom 0
        right 0
        left 0
        background: $material-theme.bg-color
        overflow-x hidden
        overflow-y auto
    
    &.open
  
        .search-history-wrapper
            display block
            .history-list
                opacity 1

</style>
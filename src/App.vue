<template>
    <div id="app">
        <app-shell></app-shell>
    </div>
</template>

<script>
import {AppShell} from '@/app-shells';

export default {
    name: 'app',
    components: {
        AppShell
    }
};
</script>

<style lang="stylus">

#app
    font-family Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale

</style>

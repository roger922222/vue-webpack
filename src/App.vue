<template>
    <div>
        <Loading v-show="loading" />
        <router-view></router-view>
    </div>
</template>    

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { mapState } from 'vuex'
    import Loading from 'src/components/Loading'

    @Component({
        computed: mapState({
            loading: 'loading'
        }),
        components: {
            Loading
        }
    })
    
    export default class App extends Vue {}
</script>

<style lang="less"></style>
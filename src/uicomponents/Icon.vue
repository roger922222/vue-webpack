<template>
    <div class="icon">
        <img :src="src" alt="" class="icon-root">
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({
        props: {
            type: {
                type: String
            }   
        },
        computed: {
            src () {
                switch (this.type) {
                    case 'add': 
                        return ''
                    default:
                        return this.type    
                }
            }
        }
    })

    export default class Icon extends Vue {
        
    }
</script>

<style lang="less" scoped>
    .icon {

        .icon-root {
            width: 100%;
            height: 100%;
        }
    }
</style>


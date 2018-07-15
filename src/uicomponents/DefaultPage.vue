<template>
    <div class="default">
        <div class="default-model">
            <div class="default-content">
                <slot name="icon"></slot>
                <slot name="title"></slot>
                <slot name="content"></slot>
                <slot name="buttons"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})

    export default class DefaultPage extends Vue {}
</script>

<style lang="less" scoped>
    .default {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;

        .default-model {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
</style>



<template>
    <div class="root" v-if="show">
        <div class="bg" :class="[isClosing ? `hide-bg` : `show-bg`]" @click="hide"></div>
        <div class="content" :class="[position, isClosing ? `hide-${position}` : `show-${position}`]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({
        props: {
            position: {
                type: String,
                default: 'bottom'
            },
            show: {
                type: Boolean,
                default: false
            }
        }
    })

    export default class Drawer extends Vue {
        isClosing = false

        mounted () {
            document.documentElement.style.overflow = 'hidden'
            document.documentElement.style.height = '100%'
            document.body.style.overflow = 'hidden'
            document.body.style.height = '100%'
        }

        destroyed () {
            document.documentElement.style.overflow = 'visible'
            document.documentElement.style.height = 'auto'
            document.body.style.overflow = 'visible'
            document.body.style.height = 'auto'
        }

        hide () {
            this.$emit('hideDraw')
        }
    }
</script>

<style lang="less" scoped>
    .root {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;

        .bg {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .5)
        }

        .content {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;

            &.top {
                left: 0;
                top: 0;
                width: 100%;
            }
            
            &.bottom {
                left: 0;
                bottom: 0;
                width: 100%;
            }

            &.right {
                right: 0;
                top: 0;
                height: 100%;
            }

            &.left {
                left: 0;
                top: 0;
                height: 100%;
            }
        }
    }

    @keyframes showBgFrames {
        0% {
            background: rgba(0, 0, 0, 0)
        }

        100% {
            background: rgba(0, 0, 0, .5)
        }  
    }

    @keyframes hideBgFrames {
        0% {
            background: rgba(0, 0, 0, .5)
        }

        100% {
            background: rgba(0, 0, 0, 0)
        }  
    }

    @keyframes showBottomFrames {
        0% {
            bottom: -100%
        }
        100% {
            bottom: 0
        }
    }

    @keyframes hideBottomFrames {
        0% {
            bottom: 0;
        }
        100% {
            bottom: -100%;
        }
    }

    @keyframes showRightFrames {
        0% {
            right: -100%;
        }
        100% {
            bottom: 0;
        }
    }

    @keyframes hideRightFrames {
        0% {
            right: 0;
        }
        100% {
            right: -100%;
        }
    }

    @keyframes showLeftFrames {
        0% {
            left: -100%;
        }
        100% {
            left: 0;
        }
    }

    @keyframes hideLeftFrames {
        0% {
            left: 0;
        }
        100% {
            left: -100%;
        }
    }

    @keyframes showTopFrames {
        0% {
            top: -100%;
        }
        100% {
            top: 0;
        }
    }

    @keyframes hideTopFrames {
        0% {
            top: 0;
        }
        100% {
            top: -100%;
        }
    }

    .show-bg {
        background: rgab(0, 0, 0, .5);
        animation: showBgFrames .5s ease-in-out
    }

    .hide-bg {
        background: rgab(0, 0, 0, 0);
        animation: hideBgFrames .5s ease-in-out
    }

    .show-bottom {
        bottom: 0;
        animation: showBottomFrames 1s ease-in-out;
    }

    .hide-bottom {
        bottom: -100%;
        animation: hideBottomFrames 1s ease-in-out;
    }

    .show-right {
        right: 0;
        animation: showRightFrames 1s ease-out;
    }

    .hide-right {
        right: -100%;
        animation: hideRightFrames 1s ease-out;
    }

    .show-left {
        left: 0;
        animation: showLeftFrames 1s ease-out;
    }

    .hide-left {
        left: -100%;
        animation: hideLeftFrames 1s ease-out;
    }

    .show-top {
        top: 0;
        animation: showTopFrames 1s ease-out;
    }

    .hide-top {
        top: -100%;
        animation: hideTopFrames 1s ease-out;
    }
</style>



<template>
    <div ref="wrapper">
        <slot :name="name"></slot>
        <!-- 加动画部分 -->
    </div>
</template>    

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import BScroll from 'better-scroll'

    @Component({
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            scrollX: {
                type: Boolean,
                default: false
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            pullup: {
                type: Boolean,
                default: false
            },
            pulldown: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            pullUpLoad: {
                type: null
            },
            pullDownRefresh: {
                type: null
            },
            height: {
                type: Number,
                default: screen.availHeight
            },
            hasMore: {
                type: Boolean,
                default: true
            },
            name: {
                type: String
            }
        },
        watch: {
            data () {
                setTimeout(() => {
                    this.forceUpdate()
                }, this.refreshDelay)
            }
        }
    })
    
    export default class Scroller extends Vue {
        state = {
            isPullUpLoad: false,
            pullUpDirty: true,
            beforePullDown: true,
            isPullingDown: false
        }

        mounted () {
            setTimeout(() => {
                this.__initScroll()
            }, 20)
        }

        __initScroll () {
            if (!this.$refs.wrapper) return

            this.$refs.wrapper.style.height = this.height + 'px'

            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX,
                pullUpLoad: this.pullUpLoad,
                pullDownRefresh: this.pullDownRefresh
            })

            // 是否派发滚动事件
            if (this.listenScroll) {
                this.scroll.on('scroll', pos => {
                    this.$emit('scroll', pos)
                })
            }

            // 上拉加载
            if (this.pullUpLoad && this.hasMore) {
                this.scroll.on('pullingUp', () => {
                    this.state.isPullUpLoad = true
                    this.$emit('pullingUp')
                })
            }

            // 下拉刷新
            if (this.pullDownRefresh) {
                this.scroll.on('pullingDown', () => {
                    this.state.beforePullDown = false
                    this.state.isPullingDown = true
                    this.$emit('pullingDown')
                })
            }
        }

        forceUpdate (dirty) {
            if (this.pullUpLoad && this.state.isPullUpLoad) {
                this.state.isPullUpLoad = false
                this.scroll.finishPullUp()
                this.state.pullUpDirty = dirty
                this.refresh()
            } else if (this.pullDownRefresh && this.state.isPullingDown) {
                this.state.isPullingDown = false
                this.__reboundPullDown().then(() => {
                    this.__afterPullDown()
                })
            }
        }

        __reboundPullDown () {
            const { stopTime = 600 } = this.pullDownRefresh
            return new Promise(resolve => {
                setTimeout(() => {
                    this.scroll.finishPullDown()
                    resolve()
                }, stopTime)
            })
        }

        __afterPullDown () {
            setTimeout(() => {
                this.refresh()
            }, this.scroll.options.bounceTime)
        }

        refresh () {
            this.scroll && this.scroll.refresh()
        }
    }
</script>


<template>
    <div class="popup-loading">
        <div class="model">
            <div class="load-box">
                <img src="../images/loading_logo.png" alt="" class="loading">
                <img src="../images/loading_loop.png" alt="" class="loading, loading-rote">
            </div>
        </div>
    </div>
</template>    

<script>
    export default {
        name: 'Loading',
        mounted () {}
    }
</script>

<style lang="less" scoped>
    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .popup-loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;

        .model {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;

            .load-box {
                position: relative;
                width: 60px;
                height: 60px;
                background: rgba(0, 0, 0, .5);

                .loading {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 60px;
                    height: 60px;  
                }

                .loading-rote {
                    animation: rotating 1s infinite linear;  
                }
            }
        }
    }
</style>


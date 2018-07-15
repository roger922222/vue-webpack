<template>
    <div class="test">
        欢迎进入测试页,
        已经为您准备了一个成功的路由页面例子，欢迎在此基础上开发，祝您工作愉快
    </div>
</template>    

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    
    export default class Test extends Vue {}
</script>

<style lang="less" scoped>
    .test {
        font-size: 50px;
        color:  #000;
    }
</style>
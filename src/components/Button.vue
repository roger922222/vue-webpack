<template>
    <button 
        type="button" 
        class="btn" 
        :class="type" 
        :disabled="disabled"
        @click="handler($event)"
    ><slot></slot></button>
</template>    

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({
        props: {
            type: {
                type: String,
                default: 'primary'
            },
            disabled: {
                type: Boolean,
                default: false
            },
        }
    })

    export default class Button extends Vue {
        handler (event) {
            this.$emit('btnClick', event)
        }
    }
</script>

<style lang="less" scoped>
    .btn {
        min-height: 47px;
        font-size: 15px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        line-height: 1.4;
        padding: 0 15px;
        border-radius: 1px;
        margin: 16px auto;
  }

    .primary {
        background: #ff721f;
        color: #fff;
    }

    .secondary {
        background-color: #fff;
        color: rgba(0,0,0,.85);
        border: 1px solid rgba(0,0,0,.1);
        font-weight: 500; 
    }
</style>


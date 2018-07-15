<template>
    <div class="confirm" v-if="show"></div>
</template>

 <script>
      import Vue from 'vue'
      import Component from 'vue-class-component'

      @Component({
          props: {
              show: {
                  type: Boolean,
                  default: false
              },
              yesLabel: {
                  type: String,
                  default: '确定'
              },
              noLabel: {
                  type: String,
                  default: '取消'
              }
          }
      })

      export default class Confirm extends Vue {}
 </script>

 <style lang="less" scoped>
 
 </style>
 
  
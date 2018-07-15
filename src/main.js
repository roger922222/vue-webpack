import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import FastClick from 'fastclick'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

FastClick.attach(document.body)

sync(store, router)

Vue.prototype.$ajax = axios

router.beforeEach((to, from, next) => {
    store.dispatch('loading')
    next()
})

router.afterEach(to => {
    store.dispatch('hideing')
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

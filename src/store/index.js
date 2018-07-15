import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: 0
    },
    mutations,
    getters,
    actions,
    strict: process.env.NODE_ENV !== 'production',
    modules: {}
})

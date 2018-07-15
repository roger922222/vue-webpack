import mutationTypes from './mutation-types'

export default {
    loading ({commit}) {
        commit(mutationTypes['LOADING'])
    },
    hideing ({commit}) {
        commit(mutationTypes['HIDEING'])
    }
}

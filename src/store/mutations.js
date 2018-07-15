import mutationTypes from './mutation-types'

export default {
    [mutationTypes.LOADING] (state) {
        state.loading += 1
    },
    [mutationTypes.HIDEING] (state) {
        state.loading -= 1
    }
}

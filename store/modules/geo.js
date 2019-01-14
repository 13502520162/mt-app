const state = () => ({
  positon: {}
})

const mutations = {
  setPosition(state, val) {
    state.positon = val
  }
}

const actions = {
  setPosition: ({
                  commit
                }, position) => {
    commit('setPosition', position)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

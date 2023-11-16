export const actions = {
  resetMainState ({ commit }) {
    commit('user/resetState')
    commit('jobs/resetState')
    commit('events/resetState')
    commit('shifts/resetState')
  }
}

export const actions = {
  resetMainState ({ commit }) {
    commit('user/resetState')
    commit('jobs/resetState')
    commit('calendar/resetState')
  }
}

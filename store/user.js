export const state = () => ({
  user: null,
  profile: null
})

export const mutations = {
  setUser (state, userData) {
    state.user = userData
  },
  setProfile (state, profileData) {
    state.profile = profileData
  },
  resetState (state) {
    state.user = null
    state.profile = null
  }
}

export const actions = {
  async upsertProfile ({ commit }, profile) {
    const { data, error } = await this.$supabase.from('profiles').upsert(profile)

    if (error) {
      throw error
    }

    commit('setProfile', data[0])
  }
}

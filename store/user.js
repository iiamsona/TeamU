export const state = () => ({
  user: null,
  profile: null,
  users: [{
    id: 1,
    name: 'Sona',
    active: false
  }
  ]
})

export const getters = {
  activeUsers: state => state.users.filter(u => u.active)
}

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

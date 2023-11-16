export const state = () => ({
  jobsList: []
})

export const mutations = {
  setJobs (state, jobs) {
    state.jobsList = jobs
  },
  addNewJob (state, job) {
    state.jobsList.push(job)
  },
  updateJob (state, job) {
    const index = state.jobsList.findIndex(j => j.id === job.id)

    state.jobsList[index].name = job.name
    state.jobsList[index].description = job.description
  },
  removeJob (state, id) {
    state.jobsList = state.jobsList.filter(j => j.id !== id)
  },
  resetState (state) {
    state.jobsList = []
  }
}

export const actions = {
  async fetchJobs ({ commit }) {
    const { data, error } = await this.$supabase.from('jobs').select('*')

    if (error) {
      throw error
    }

    commit('setJobs', data)
  },
  async createJob ({ commit }, job) {
    const { data, error } = await this.$supabase.from('jobs').insert([job])

    if (error) {
      throw error
    }

    commit('addNewJob', data[0])

    return data[0]
  },
  async updateJob ({ commit }, job) {
    const { data, error } = await this.$supabase.from('jobs').update({
      name: job.name,
      description: job.description
    }).eq('id', job.id)

    if (error) {
      throw error
    }

    commit('updateJob', data[0])

    return data[0]
  },
  async deleteJob ({ commit }, id) {
    const { error } = await this.$supabase.from('jobs').delete().eq('id', id)

    if (error) {
      throw error
    }

    commit('removeJob', id)
  }
}

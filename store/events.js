export const state = () => ({
  events: []
})

export const mutations = {
  addEvent (state, event) {
    if (!state.events.find(e => e.id === event.id)) {
      event.start = this.$moment(event.start).format('YYYY-MM-DD HH:mm')
      event.end = this.$moment(event.end).format('YYYY-MM-DD HH:mm')
      state.events.push(event)
    }
  },
  updateEvent (state, event) {
    const index = state.events.findIndex(e => e.id === event.id)

    if (index >= 0) {
      state.events[index].name = event.name
      state.events[index].description = event.description
      state.events[index].color = event.color
      state.events[index].start = this.$moment(event.start).format('YYYY-MM-DD HH:mm')
      state.events[index].end = this.$moment(event.end).format('YYYY-MM-DD HH:mm')
    }
  },
  deleteEvent (state, id) {
    state.events = state.events.filter(e => e.id !== id)
  },
  resetState (state) {
    state.events = []
  }
}

export const actions = {
  async fetchEvents ({ commit }) {
    const { data, error } = await this.$supabase.from('events').select('*')

    if (error) {
      throw error
    }

    for (const event of data) {
      commit('addEvent', event)
    }
  },
  async upsertEvent ({ commit }, event) {
    const start = event.start.toISOString()
    const end = event.end.toISOString()

    const { data, error } = await this.$supabase.from('events').upsert({ ...event, start, end })

    if (error) {
      throw error
    }

    commit(event.id ? 'updateEvent' : 'addEvent', data[0])
  },
  async bulkAddEvents ({ commit }, events) {
    const { data, error } = await this.$supabase.from('events').insert(events)

    if (error) {
      throw error
    }

    for (const event of data) {
      commit('addEvent', event)
    }
  },
  async deleteEvent ({ commit }, id) {
    const { error } = await this.$supabase.from('events').delete().eq('id', id)

    if (error) {
      throw error
    }

    commit('deleteEvent', id)
  }
}

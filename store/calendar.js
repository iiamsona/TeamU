export const state = () => ({
  calendarEvents: []
})

export const mutations = {
  addEvent (state, event) {
    event.start = this.$moment(event.start).format('YYYY-MM-DD HH:mm')
    event.end = this.$moment(event.end).format('YYYY-MM-DD HH:mm')
    state.calendarEvents.push(event)
  },
  updateEvent (state, event) {
    const index = state.calendarEvents.findIndex(e => e.id === event.id)

    if (index >= 0) {
      state.calendarEvents[index].title = event.title
      state.calendarEvents[index].description = event.description
      state.calendarEvents[index].start = event.start
      state.calendarEvents[index].end = event.end
      state.events[index].color = event.color
    }
  },
  removeEvent (state, id) {
    state.calendarEvents.filter(f => f.id !== id)
  },
  resetEvent (state) {
    state.calendarEvents = []
  }
}

export const actions = {
  async fetchEvents ({ commit }) {
    const { data, error } = await this.$supabase.from('events').select('*')
    if (error) {
      throw error
    }
    commit('setEvent', data)
  },
  async createEvent ({ commit }, event) {
    const { data, error } = await this.$supabase.from('events').insert([event])
    if (error) {
      throw error
    }
    commit('addEvent', data[0])
    return data[0]
  },
  async updateEvent ({ commit }, event) {
    const { data, error } = await this.$supabase.from('events').update({
      title: this.title,
      description: this.description
    }
    ).eq('id', event.id)
    if (error) {
      throw error
    }
    commit('updateEvent', data[0])
    return data[0]
  },
  async deleteEvent ({ commit }, id) {
    const { error } = await this.$supabase.from('events').delete().eq('id', id)
    if (error) {
      throw error
    }
    commit('deleteEvent', id)
  }
}

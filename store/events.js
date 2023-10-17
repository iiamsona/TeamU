export const state = () => ({
  events: []
})

export const mutations = {
  setEvents (state, events) {
    state.events = events.map(event => ({
      ...event,
      start: this.$moment(event.start).format('YYYY-MM-DD HH:mm'),
      end: this.$moment(event.end).format('YYYY-MM-DD HH:mm')
    }))
  },
  addEvent (state, event) {
    state.events.push({
      ...event,
      start: this.$moment(event.start).format('YYYY-MM-DD HH:mm'),
      end: this.$moment(event.end).format('YYYY-MM-DD HH:mm')
    })
  },
  updateEvent (state, event) {
    const index = state.events.findIndex(e => e.id === event.id)

    if (index >= 0) {
      state.events[index] = {
        ...state.events[index],
        name: event.name,
        description: event.description,
        color: event.color,
        start: event.start,
        end: event.end
      }
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

    commit('setEvents', data)
  },
  async upsertEvent ({ commit }, event) {
    const start = event.start.toISOString()
    const end = event.end.toISOString()

    const { data, error } = await this.$supabase
      .from('events')
      .upsert({ ...event, start, end })

    if (error) {
      throw error
    }

    commit(event.id ? 'updateEvent' : 'addEvent', data[0])
  },
  async deleteEvent ({ commit }, id) {
    const { error } = await this.$supabase.from('events').delete().eq('id', id)

    if (error) {
      throw error
    }

    commit('deleteEvent', id)
  }
}

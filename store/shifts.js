export const state = () => ({
  shifts: []
})

export const mutations = {
  setShifts (state, shifts) {
    state.shifts = shifts
  },
  addShift (state, shift) {
    if (!state.shifts.find(s => s.id === shift.id)) {
      state.shifts.push(shift)
    }
  },
  updateShift (state, shift) {
    const index = state.shifts.findIndex(s => s.id === shift.id)
    if (index >= 0) {
      state.shifts[index].name = shift.name
      state.shifts[index].description = shift.description
      state.shifts[index].start = shift.start
      state.shifts[index].end = shift.end
      state.shifts[index].days = shift.days
    }
  },
  deleteShift (state, id) {
    state.shifts = state.shifts.filter(s => s.id !== id)
  },
  resetState (state) {
    state.shifts = []
  }
}

export const actions = {
  async fetchShifts ({ commit }) {
    const { data, error } = await this.$supabase.from('shifts').select('*')

    if (error) {
      throw error
    }

    commit('setShifts', data)
  },
  async upsertShift ({ commit }, shift) {
    shift.days = shift.days.join('')

    const { data, error } = await this.$supabase.from('shifts').upsert(shift)

    if (error) {
      throw error
    }

    commit(shift.id ? 'updateShift' : 'addShift', data[0])
  },
  async deleteShift ({ commit }, id) {
    const { error } = await this.$supabase.from('shifts').delete().eq('id', id)

    if (error) {
      throw error
    }

    commit('deleteShift', id)
  }
}

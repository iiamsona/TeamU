export const state = () => ({
  notifications: []
})

export const getters = {
  unreadNotificationsCount: state => state.notifications.filter(n => n.unread).length
}

export const mutations = {
  setNotifications (state, notifications) {
    state.notifications = notifications
  }
}

export const actions = {
  async fetchNotifications ({ commit }) {
    const notifications = [
      { id: '1', name: 'New job request', description: 'Anna has invited you to join Coderiders workspace', unread: true }
    ]

    await setTimeout(() => commit('setNotifications', notifications), 1500)
  }
}

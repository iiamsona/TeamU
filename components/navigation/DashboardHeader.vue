<template>
  <v-app-bar fixed app flat color="white">
    <v-btn icon @click="$emit('toggleDrawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-spacer />

    <div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu offset-y rounded="lg">
        <template #activator="{ on, attrs }">
          <v-btn icon class="mr-3" v-bind="attrs" v-on="on">
            <v-badge
              bordered
              top
              color="red accent-3"
              dot
              offset-x="10"
              offset-y="10"
              :value="unreadCount"
            >
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list flat>
          <v-list-item v-for="notification in notifications" :key="notification.id">
            <v-list-item-title>
              {{ notification.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ notification.description }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y rounded="lg">
        <template #activator="{ on, attrs }">
          <v-avatar size="40" v-bind="attrs" v-on="on">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg" />
          </v-avatar>
        </template>

        <v-list flat>
          <v-list-item to="/profile" exact router color="primary">
            <v-list-item-action>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item color="primary" tag="button" @click="signOut">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Signout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      notifications: state => state.notifications.notifications
    }),
    ...mapGetters({
      unreadCount: 'notifications/unreadNotificationsCount'
    })
  },
  methods: {
    async signOut () {
      const { error } = await this.$supabase.auth.signOut()

      if (!error) {
        this.$store.dispatch('resetMainState')
        this.$router.push('signin')
      }
    }
  }
}
</script>

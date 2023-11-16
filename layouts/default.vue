<template>
  <v-app>
    <NavDashboardAside :drawer-visibility="drawer" />
    <NavDashboardHeader @toggleDrawer="drawer = !drawer" />
    <v-main>
      <v-divider />
      <NavDashboardSubHeader />
      <v-divider />
      <v-container fluid class="pa-5">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  middleware: ['auth'],
  data () {
    return {
      drawer: true
    }
  },
  mounted () {
    this.getNotifications()
  },
  methods: {
    ...mapActions({
      getNotifications: 'notifications/fetchNotifications'
    })
  }
}
</script>

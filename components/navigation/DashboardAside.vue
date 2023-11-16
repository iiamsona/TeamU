<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="miniVariant"
    fixed
    app
    mini-variant-width="72"
  >
    <div class="d-flex align-center justify-space-between px-4 py-3">
      <div class="d-flex align-center">
        <img src="/logo.svg" alt="Logo">
        <h1 v-show="!miniVariant" class="ml-2 text-h5 font-weight-black">
          TeamU
        </h1>
      </div>

      <v-btn v-show="!miniVariant" icon @click="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
    </div>

    <v-divider />

    <div class="mt-4 px-4">
      <v-subheader v-show="!miniVariant" class="mb-0 px-0 font-weight-bold text-caption text-uppercase">
        Main Menu
      </v-subheader>
      <v-list nav class="px-0">
        <v-list-item
          v-for="(item, i) in mainMenu"
          :key="i"
          :to="item.to"
          router
          exact
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list nav class="px-0">
        <v-list-group
          v-for="item in groupedMenu"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
            exact
            class="pl-6"
          >
            <v-list-item-action>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>

    <v-divider v-show="miniVariant" />

    <div class="mt-4 px-4">
      <v-subheader v-show="!miniVariant" class="mb-0 px-0 text-caption font-weight-bold text-uppercase">
        Settings
      </v-subheader>
      <v-list nav class="px-0">
        <v-list-item
          v-for="(item, i) in settingsMenu"
          :key="i"
          :to="item.to"
          router
          exact
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawerVisibility: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      drawer: true,
      miniVariant: false,
      mainMenu: [
        {
          icon: 'mdi-home-outline',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-briefcase-variant-outline',
          title: 'Jobs',
          to: '/jobs'
        },
        {
          icon: 'mdi-calendar',
          title: 'Calendar',
          to: '/calendar'
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Team',
          to: '/team'
        },
        {
          icon: 'mdi-inbox',
          title: 'Inbox',
          to: '/inbox'
        }
      ],
      groupedMenu: [
        {
          icon: 'mdi-calendar-outline',
          title: 'Schedules',
          items: [
            {
              title: 'Shift Management',
              icon: 'mdi-wrench-clock',
              to: '/schedules/shifts'
            },
            {
              title: 'Clockify',
              icon: 'mdi-clock-outline',
              to: '/schedules/timer'
            }
          ]
        },
        {
          icon: 'mdi-chart-timeline-variant-shimmer',
          title: 'Reports',
          items: [
            {
              title: 'Weekly',
              icon: 'mdi-calendar-week-outline',
              to: '/reports/weekly'
            },
            {
              title: 'Time & activities',
              icon: 'mdi-timeline-clock-outline',
              to: '/reports/time-and-activities'
            },
            {
              title: 'Payments',
              icon: 'mdi-cash-clock',
              to: '/reports/payments'
            }
          ]
        }
      ],
      settingsMenu: [
        {
          icon: 'mdi-bell-outline',
          title: 'Notifications',
          to: '/notifications'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Settings',
          to: '/settings'
        }
      ]
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  watch: {
    drawerVisibility (newValue) {
      this.drawer = newValue
    }
  }
}
</script>

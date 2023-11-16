<template>
  <v-app>
    <v-container fluid class="fill-height py-0 pl-0 pr-1">
      <v-row align-content="stretch" class="fill-height">
        <v-col sm="12" lg="4" align-self="center">
          <Nuxt />
        </v-col>
        <v-col lg="8" class="py-1 pl-1 d-none d-lg-block">
          <v-img
            :src="require('@/assets/images/bg.jpg')"
            width="100%"
            height="100%"
            class="rounded-xl"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

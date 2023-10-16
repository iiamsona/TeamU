<template>
  <v-row>
    <v-col cols="12">
      test
      <v-btn @click="ok">
        ok
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async ok () {
      const { data } = await this.$supabase.from('events').select('*')
      console.log(data)
    }
  }
}
</script>

<template>
  <v-snackbar :value="state" :color="color" right @input="$emit('update:state', $event)">
    <h6 class="text-subtitle-1 mb-0 font-weight-bold">
      {{ title }}
    </h6>
    <p class="mb-0 text-body-2">
      {{ text }}
    </p>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    state: {
      type: Boolean,
      default: false
    }
  }
}
</script>

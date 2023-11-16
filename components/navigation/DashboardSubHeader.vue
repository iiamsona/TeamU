<template>
  <div class="py-4 px-5">
    <h2 class="text-subtitle-1 text-capitalize font-weight-bold">
      {{ $route.name === 'index' ? 'Dashboard' : $route.name }}
    </h2>
    <p class="mb-0 text-body-2 grey--text text--darken-1">
      {{ pageDescriptions[$route.name] }}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageDescriptions: {
        index: 'Hi, welcome to task management dashboard.',
        jobs: 'Here you can manage your Jobs and employees.',
        profile: 'Your personal space on our platform.'
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <div class="pointer blue" @click="onLandingDrag">{{ slotValue }}</div>
    <CardItem>{{ cardValue }}</CardItem>
    <TheFooter>
      Empathy Spectrum is a result of the Tolerant Futures research project.
      <NuxtLink to="/research">Read more</NuxtLink>
    </TheFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Empathy Spectrum',
      slotValue: 'New',
      cardValue: 'Beginning',
    }
  },
  methods: {
    onLandingDrag() {
      this.$router.push({
        path: '/tutorial',
      })
    },
  },
}
</script>

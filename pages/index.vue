<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <LandingGame :next-path="nextPath"></LandingGame>
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
      nextPath: '/tutorial',
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

<style lang="scss">
    @import '~assets/scss/global.scss';
</style>

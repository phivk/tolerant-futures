<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <SpectrumGame :turns="turns" :next-path="nextPath" />
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import turnsReflection from '~/data/turns-ch1.json'
export default {
  data() {
    return {
      title: 'Ch1 Reflection',
      turns: turnsReflection,
      nextPath: '/ch2',
    }
  },
  mounted() {
    this.$store.commit('setUser')
    this.$store.commit('setCurrentChapter', 'ch1')
  },
}
</script>

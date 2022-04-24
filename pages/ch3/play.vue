<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <SpectrumGame :turns="turns" :next-path="nextPath" />
  </div>
</template>

<script>
import turnsOther from '~/data/turns-ch3.json'
export default {
  data() {
    return {
      title: 'Play',
      turns: turnsOther,
      nextPath: '/ch4',
    }
  },
  mounted() {
    this.$store.commit('setCurrentChapter', 'ch3')
  },
}
</script>

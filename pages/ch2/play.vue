<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGame
      :turns="turns"
      :next-path="nextPath"
      require-player-feedback
    />
  </div>
</template>

<script>
import { getRandomTurnsPastPresent } from '~/util/game.js'
export default {
  data() {
    return {
      turns: getRandomTurnsPastPresent(3),
      nextPath: '/ch3',
      inputs: [],
    }
  },
  mounted() {
    this.$store.commit('setCurrentChapter', 'ch2')
  },
}
</script>

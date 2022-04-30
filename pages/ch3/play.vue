<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGameSelfOther
      v-if="turns.length"
      :turns="turns"
      :next-path="nextPath"
    />
  </div>
</template>

<script>
import { getRandomTurnsSelfOther } from '~/util/game.js'
export default {
  data() {
    return {
      turns: [],
      nextPath: '/ch4',
    }
  },
  created() {
    if (this.$store.state.priorInputs) {
      this.turns = getRandomTurnsSelfOther(this.$store.state.priorInputs, 3)
    } else {
      // navigate back to index page to fetch priorInputs
      this.$router.push('/ch3')
    }
  },
}
</script>

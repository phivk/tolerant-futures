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
  async mounted() {
    this.$store.commit('setCurrentChapter', 'ch3')

    const { data: pastInputs } = await this.$supabase
      .from('spectrumInput')
      .select('*')
      .eq('chapter', 'ch2')

    this.turns = getRandomTurnsSelfOther(pastInputs, 3)
  },
}
</script>

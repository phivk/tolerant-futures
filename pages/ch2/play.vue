<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGame
      :turns="turns"
      :next-path="nextPath"
      :current-chapter-index="1"
      require-player-feedback
      @submit-input="onSubmitInput"
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
  methods: {
    async onSubmitInput(currentTurn) {
      await this.$supabase
        .from('inputCh2')
        .insert([
          {
            concept: currentTurn.concept,
            conceptPresent: currentTurn.conceptPresent,
            value: currentTurn.value,
            valuePresent: currentTurn.valuePresent,
            feedback: currentTurn.feedback,
            spectrumLeft: currentTurn.spectrumLeft,
            spectrumRight: currentTurn.spectrumRight,
            chapter: this.$store.state.currentChapter,
            user: this.$store.state.user,
          },
        ])
        .single()
    },
  },
}
</script>

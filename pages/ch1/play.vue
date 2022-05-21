<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGame
      :turns="turns"
      :next-path="nextPath"
      :current-chapter-index="0"
      @submit-input="onSubmitInput"
    />
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
  methods: {
    async onSubmitInput(currentTurn) {
      await this.$supabase
        .from('inputCh1')
        .insert([
          {
            concept: currentTurn.concept,
            value: currentTurn.value,
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

<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGameSelfOther
      v-if="turns.length"
      :turns="turns"
      :next-path="nextPath"
      :current-chapter-index="2"
      @submit-input="onSubmitInput"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      turns: [],
      nextPath: '/ch4',
    }
  },
  created() {
    if (this.$store.state.turnsSelfOther) {
      this.turns = this.$store.state.turnsSelfOther
    } else {
      // navigate back to index page to fetch priorInputs and generate turns
      this.$router.push('/ch3')
    }
  },
  mounted() {
    if (!this.$store.state.user) {
      this.$store.commit('setUser')
    }
    this.$store.commit('setCurrentChapter', 'ch3')
  },
  methods: {
    async onSubmitInput(currentTurn) {
      await this.$supabase
        .from('inputCh3')
        .insert([
          {
            concept: currentTurn.concept,
            spectrumLeft: currentTurn.spectrumLeft,
            spectrumRight: currentTurn.spectrumRight,
            valueSelf: currentTurn.valueSelf,
            valueOtherGuess: currentTurn.valueOtherGuess,
            valueOtherTrue: currentTurn.valueOther,
            valueOtherDiff: currentTurn.valueOtherDiff,
            feedback: currentTurn.feedback,
            turnIndex: currentTurn.turnIndex,
            user: this.$store.state.user,
          },
        ])
        .single()
    },
  },
}
</script>

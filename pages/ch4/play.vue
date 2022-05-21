<template>
  <StandaloneConditionalDisplay>
    <template #standalone>
      <ChapterContentFutureStandalone />
    </template>
    <template #browser>
      <ChapterContentFutureBrowser @submit-input="onSubmitInput" />
    </template>
  </StandaloneConditionalDisplay>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setCurrentChapter', 'ch4')
  },
  methods: {
    async onSubmitInput(feedback) {
      await this.$supabase
        .from('inputCh4')
        .insert([
          {
            feedback,
            user: this.$store.state.user,
          },
        ])
        .single()
    },
  },
}
</script>

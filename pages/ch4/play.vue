<template>
  <StandaloneConditionalDisplay>
    <template #standalone>
      <ChapterContentFutureStandalone @submit-input="onSubmitInput" />
    </template>
    <template #browser>
      <ChapterContentFutureBrowser @submit-input="onSubmitInput" />
    </template>
  </StandaloneConditionalDisplay>
</template>

<script>
export default {
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

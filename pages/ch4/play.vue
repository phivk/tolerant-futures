<template>
  <StandaloneConditionalDisplay>
    <template #standalone>
      <ChapterContentFutureStandalone />
    </template>
    <template #browser>
      <ChapterContentFutureBrowser />
    </template>
  </StandaloneConditionalDisplay>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setCurrentChapter', 'ch4')
  },
}
</script>

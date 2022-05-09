<template>
  <ul class="chapter-progression-list">
    <ChapterProgressionItem
      v-for="(isCompleted, index) in chaptersCompleted"
      :key="index"
      :is-completed="isCompleted"
    />
  </ul>
</template>

<script>
export default {
  props: {
    currentChapterIndex: {
      type: Number,
      required: true,
      default: null,
    },
  },
  computed: {
    chaptersCompleted() {
      const allChaptersIndexes = [0, 1, 2, 3]
      const chaptersCompleted = allChaptersIndexes.map((v) => {
        if (v <= this.currentChapterIndex) {
          return true
        } else {
          return false
        }
      })
      return chaptersCompleted
    },
  },
}
</script>

<style scoped lang="scss">
.chapter-progression-list {
  margin: 0;
  display: flex;

  .chapter-progression-item {
    margin-left: $offset-1;
    margin-right: $offset-1;

    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>

<template>
  <ChapterOpening :title="title" :paragraph="paragraph" />
</template>

<script>
import chapters from '~/config/chapters'
export default {
  data() {
    const chapterIndex = 3
    return {
      title: chapters[chapterIndex].title,
      paragraph: chapters[chapterIndex].paragraph,
    }
  },
  mounted() {
    if (!this.$store.state.user) {
      this.$store.commit('setUser')
    }
    this.$store.commit('setCurrentChapter', 'ch4')
  },
}
</script>

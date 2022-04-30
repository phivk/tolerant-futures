<template>
  <ChapterOpening :title="title" :paragraph="paragraph" />
</template>

<script>
import chapters from '~/config/chapters'
export default {
  data() {
    const chapterIndex = 2
    return {
      title: chapters[chapterIndex].title,
      paragraph: chapters[chapterIndex].paragraph,
    }
  },
  async mounted() {
    this.$store.commit('setCurrentChapter', 'ch3')

    const { data: priorInputs } = await this.$supabase
      .from('spectrumInput')
      .select('*')
      .eq('chapter', 'ch2')

    this.$store.commit('setPriorInputs', priorInputs)
  },
}
</script>

<template>
  <ChapterOpening :title="title" :paragraph="paragraph" />
</template>

<script>
import chapters from '~/config/chapters'
export default {
  data() {
    const chapterIndex = 0
    return {
      title: chapters[chapterIndex].title,
      paragraph: chapters[chapterIndex].paragraph,
    }
  },
}
</script>

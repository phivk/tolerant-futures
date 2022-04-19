<template>
  <ChapterOpening :title="title" :paragraph="paragraph" />
</template>

<script>
import chapters from '~/config/chapters'
export default {
  data() {
    const chapterIndex = 1
    return {
      title: chapters[chapterIndex].title,
      paragraph: chapters[chapterIndex].paragraph,
    }
  },
}
</script>

<template>
  <ChapterOpening :title="title" :paragraph="paragraph" :next-path="nextPath" />
</template>

<script>
import { getNextRouteName } from '~/util/routes'
export default {
  data() {
    return {
      title: 'Chapter 2: Past & Present',
      paragraph: '<introduce the chapter: introduce the research here?>',
      nextPath: getNextRouteName(this.$route.name),
    }
  },
}
</script>

<template>
  <ChapterOpening :title="title" :paragraph="paragraph" :next-path="nextPath" />
</template>

<script>
import { getNextRouteName } from '~/util/routes'
export default {
  data() {
    return {
      title: 'Chapter 1: Reflection',
      paragraph:
        '<introduce the chapter: Why should the player introduce themselves, reflect on themselves?>',
      nextPath: getNextRouteName(this.$route.name),
    }
  },
}
</script>

<template>
  <ChapterOpening :title="title" :paragraph="paragraph" :next-path="nextPath" />
</template>

<script>
import { getNextRouteName } from '~/util/routes'
export default {
  data() {
    return {
      title: 'Chapter 4: Your future',
      paragraph:
        '<introduce the chapter and make clear that the future is in the hands of the player>',
      nextPath: getNextRouteName(this.$route.name),
    }
  },
}
</script>

<template>
  <ChapterOpening :title="title" :paragraph="paragraph" :next-path="nextPath" />
</template>

<script>
import { getNextRouteName } from '~/util/routes'
export default {
  data() {
    return {
      title: 'Chapter 3: Conversation with a previous player',
      paragraph: '<introduce the chapter and the player>',
      nextPath: getNextRouteName(this.$route.name),
    }
  },
}
</script>

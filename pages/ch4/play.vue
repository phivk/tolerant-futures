<template>
  <StandaloneConditionalDisplay></StandaloneConditionalDisplay>
</template>

<script>
export default {
  data() {
    return {
      title: 'The Future',
      paragraph:
        "As part of this installation, you'll find a set of physical cards. We invite you to pick one and take it with you. What meaning do you attach to this card? And how would someone else see it? Feel free to use this card as a keepsake or a conversation starter whenever the moment is right.",
      nextButtonText: 'Back to start',
      nextPath: '/',
    }
  },
  mounted() {
    this.$store.commit('setCurrentChapter', 'ch4')
  },
}
</script>

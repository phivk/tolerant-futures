<template>
  <ChapterWrapperFuture
    :title="title"
    :paragraph="paragraph"
    button-text="Back to start"
    next-path="/"
  />
</template>

<script>
export default {
  data() {
    return {
      title: 'Chapter 4: The Future',
      paragraph:
        "As part of this installation, you'll find a set of physical cards. We invite you to pick one and take it with you. What meaning do you attach to this card? And how would someone else see it? Feel free to use this card as a keepsake or a conversation starter whenever the moment is right.",
    }
  },
}
</script>

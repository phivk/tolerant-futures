<template>
  <li
    class="chapter-progression-item"
    :class="{ chapter_completed: isCompleted }"
  ></li>
</template>

<script>
export default {
  props: {
    isCompleted: {
      type: Boolean,
      required: true,
      default: null,
    },
  },
}
</script>

<style scoped lang="scss">
.chapter-progression-item {
  width: $chapter-progression-item-width;
  height: $chapter-progression-item-width;
  background-color: $signal-color;
  border-radius: $border-radius-1;
  filter: blur($blur-1);

  &.chapter_completed {
    filter: blur(0);
  }
}
</style>

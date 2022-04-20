<template>
  <li class="chapter-progression-item"></li>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.chapter-progression-item {
  width: $chapter-progression-item-width;
  height: $chapter-progression-item-width;
  background-color: $signal-color;
  border-radius: $border-radius-1;
  filter: blur($blur-1);

  .level_completed {
    filter: blur(0);
  }
}
</style>

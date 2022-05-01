<template>
  <div class="subtitle-player">
    <p class="center mw8">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.subtitle-player {
  width: 100%;
  height: 50px;

  p {
    color: $white-color;
    filter: $caption-shadow-effect;
  }
}
</style>

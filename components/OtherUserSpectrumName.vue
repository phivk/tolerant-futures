<template>
  <span class="other-user-spectrum-name">
    <slot></slot>
  </span>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.other-user-spectrum-name {
  font-family: $headline-font;
  font-size: $f-2;
  z-index: $z-2;
  color: $background-color;
}
</style>

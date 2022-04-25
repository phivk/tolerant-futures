<template>
  <span class="drop-zone-name"><slot></slot></span>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.drop-zone-name {
  font-family: $headline-font;
  font-size: $f-1;
  z-index: $z-2;
  color: $background-color;
}
</style>

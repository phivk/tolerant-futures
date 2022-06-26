<template>
  <span class="drop-zone-name"><slot></slot></span>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.drop-zone-name {
  font-family: $headline-font;
  font-size: $f-0;
  z-index: $z-5;
  color: $background-color;

  @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
    font-size: $f-2;
  }

  @media (max-width: $query-mobile-landscape) and (orientation: portrait) {
    font-size: $f-3;
  }
}
</style>

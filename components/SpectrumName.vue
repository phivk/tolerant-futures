<template>
  <span class="spectrum-name">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.spectrum-name {
  font-family: $headline-font;
  font-size: $f-2;
  z-index: $z-2;
  color: $background-color;

  @media (max-width: $query-mobile) {
    font-size: $f-3;
  }
}
</style>

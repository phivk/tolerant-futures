<template>
  <p class="subtitle-player">
    <slot></slot>
  </p>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.subtitle-player {
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding-left: $offset-8;
  padding-right: $offset-8;
  text-align: center;
  color: $white-color;
  font-size: $f-1;
  filter: $caption-shadow-effect;
  line-height: 2.8rem;

  @media (max-width: $query-mobile) {
    font-size: $f-4;
    line-height: 1.8rem;
    padding-left: $offset-3;
    padding-right: $offset-3;
  }   
}
</style>

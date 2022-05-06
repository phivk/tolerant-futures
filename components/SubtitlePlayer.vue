<template>
  <div class="subtitle-player">
    <p>
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
  display: block;
  box-sizing: border-box;
  padding-left: $offset-8;
  padding-right: $offset-8;

  p {
    text-align: center;
    color: $white-color;
    font-size: $f-1;
    filter: $caption-shadow-effect;
    line-height: 2.8rem;
  }
}
</style>

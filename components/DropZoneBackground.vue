<template>
  <span class="drop-zone-background" :class="gradientStyle"></span>
</template>

<script>
export default {
  props: {
    /* all gradientStyle classes passed to this component are generated in ~/assets/scss/gradients.scss */
    gradientStyle: {
      type: String,
      required: true,
      defaul: null,
    },
  },
}
</script>

<style scoped lang="scss">
.drop-zone-background {
  z-index: $z-1;
  position: absolute;
  left: -7%;
  width: 110%;
  height: 100%;
  filter: blur($blur-3);
}
</style>

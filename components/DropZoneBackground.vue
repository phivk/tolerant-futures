<template>
  <span class="drop-zone-background" :class="gradientClass"></span>
</template>

<script>
export default {
  props: {
    /* all gradientClass(es) passed to this component are defined in ~/assets/scss/gradients.scss */
    gradientClass: {
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

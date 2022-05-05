<template>
  <span class="other-user-spectrum-background" :class="gradientStyle"></span>
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
  }
}
</script>

<style scoped lang="scss">
.other-user-spectrum-background {
  display: block;
  width: 100%;
  height: 100px;
  filter: blur($blur-1);
}
</style>

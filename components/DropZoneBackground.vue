<template>
  <span class="drop-zone-background" :class="gradientClass"></span>
</template>

<script>
export default {
  props: {
    colorA: {
      type: String,
      required: true,
      defaul: null,
    },
    colorB: {
      type: String,
      required: true,
      defaul: null,
    },    
  },
  computed: {

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

<template>
  <span class="drop-zone-background" :style="styleObject"></span>
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
    styleObject() {
      return {
        background: "linear-gradient(90deg, " + this.colorA + " 25%, " + this.colorB + " 75%)",
      }     
    }
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

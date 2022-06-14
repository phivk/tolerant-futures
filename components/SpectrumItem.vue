<template>
  <div>
    <slot></slot>
    <span class="spectrum-item">
      <span class="gradient" :style="styleObjectGradient"></span>
      <span class="spectrum-card" :style="styleObjectCard"></span>
    </span>
  </div>
</template>

<script>
import { remapRange } from '~/util/math.js'

export default {
  props: {
    colorA: {
      type: String,
      required: true,
      default: null,
    },
    colorB: {
      type: String,
      required: true,
      default: null,
    },
    spectrumPosition: {
      type: Number,
      required: true,
      default: null,
    },
  },
  computed: {
    styleObjectGradient() {
      return {
        background:
          'linear-gradient(90deg, ' +
          this.colorA +
          ' 25%, ' +
          this.colorB +
          ' 75%)',
      }
    },
    styleObjectCard() {
      const mediaQuery = window.matchMedia("(max-width: 900px)")
      let n;
      if (mediaQuery.matches) { 
        n = remapRange(this.spectrumPosition, 0.0, 1.0, 0.0, 71.0)
      } else {
        n = remapRange(this.spectrumPosition, 0.0, 1.0, 0.0, 87.0)
      }   
      n = Math.round(n)
      n = n + '%'
      return { left: n }
    },
  },
}
</script>

<style scoped lang="scss">
div {
  position: relative;
  width: 100%;
  height: $ch3-other-user-spectrum-height;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .spectrum-item {
    position: absolute;
    width: 100%;
    height: 100%;

    .gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur($blur-1);
    }

    .spectrum-card {
      z-index: $z-3;
      position: absolute;
      width: $ch3-other-user-spectrum-width;
      height: $ch3-other-user-mini-card-height;
      border-radius: $border-radius-2;
      border: 5px solid $white-color;
      top: -50%;
      transform: translateY(50%);
    }
  }
}
</style>

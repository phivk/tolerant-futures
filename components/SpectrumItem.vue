<template>
  <div>
    <slot></slot>
    <span class="spectrum-item" :class="gradientClass">
      <span class="spectrum-circle" :style="styleObject"></span>
    </span>
  </div>
</template>

<script>
import { remapRange } from '~/util/maths.js'

export default {
  props: {
    /* all gradientClass(es) passed to this component are defined in ~/assets/scss/gradients.scss */
    gradientClass: {
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
    styleObject() {
      let n = remapRange(this.spectrumPosition, 0.0, 1.0, 10.0, 90.0)
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
    filter: blur($blur-1);

    .spectrum-circle {
      position: absolute;
      width: $ch3-other-user-spectrum-height;
      height: $ch3-other-user-spectrum-height;
      border-radius: 100%;
      background-color: $white-color;
      top: -50%;
      transform: translateY(50%);
    }
  }
}
</style>

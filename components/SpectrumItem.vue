<template>
  <div>
    <slot></slot>
    <span class="spectrum-item">
      <span
        ref="spectrumRef"
        class="gradient"
        :style="styleObjectGradient"
      ></span>
      <span ref="cardRef" class="spectrum-card" :style="styleObjectCard"></span>
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
  data() {
    return {
      spectrumWidth: 0,
      cardWidth: 0,
    }
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
      // What is the maximum position-left-css-value the card item on the spectrum can have assigned?
      // rerange the absolute width of the spectrum to the relative 0-100
      const positionLeftMax = remapRange(
        this.spectrumWidth - this.cardWidth,
        0,
        this.spectrumWidth,
        0,
        100
      )
      // rerange player's turn value to the relative 0-positionLeftMax css positioning range
      let positionLeft = remapRange(
        this.spectrumPosition,
        0.0,
        1.0,
        0.0,
        positionLeftMax
      )
      positionLeft = Math.round(positionLeft)
      positionLeft = positionLeft + '%'
      return { left: positionLeft }
    },
  },
  mounted() {
    // We need the card's and the spectrum's widths when the SpectrumItem is rendered.
    // How to do it?
    // The assignment below doesn't work for some reason and returns 0
    // this.cardWidth = this.$refs.cardRef.clientWidth
    // this.spectrumWidth = this.$refs.spectrumRef.clientWidth

    // I figured out how to do it on resize..
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(event) {
      if (this.$refs.spectrumRef && this.$refs.cardRef) {
        this.cardWidth = this.$refs.cardRef.clientWidth
        this.spectrumWidth = this.$refs.spectrumRef.clientWidth
      }
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

  @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) {
    height: $ch3-other-user-spectrum-height-mobile-landscape;
  }

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
      width: $ch3-other-user-mini-card-width;
      height: $ch3-other-user-mini-card-height;
      border-radius: $border-radius-2;
      border: 5px solid $white-color;
      top: -50%;
      transform: translateY(50%);

      @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) {
        width: $ch3-other-user-mini-card-width;
        height: $ch3-other-user-mini-card-height-mobile-landscape;
      }
    }
  }
}
</style>

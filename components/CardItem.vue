<template>
  <div :style="value !== null ? styleObject : ''" class="card-item">
    <p><slot></slot></p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0.5,
    },
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
  },
  computed: {
    styleObject() {
      const colorADist = (1 - this.value - 0.25) * 100
      const colorBDst = (1 - this.value + 0.25) * 100

      return {
        background:
          'linear-gradient(90deg, ' +
          this.colorA +
          ' ' +
          colorADist +
          '%, ' +
          this.colorB +
          ' ' +
          colorBDst +
          '%)',
      }
    },
  },
}
</script>

<style scoped lang="scss">
.card-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: $card-item-width;
  height: $card-item-height;
  border-radius: $border-radius-1;
  border-style: solid;
  border-color: $card-item-outline-color;
  border-width: $border-width-2;
  padding: 0 $offset-4;
  background-color: $card-item-background-color;
  box-sizing: border-box;
  -webkit-transform: translateZ(
    0
  ); // hack to fix the bug where on iOS an animated element with filter attribute would leave ugly trail behind
  filter: $draggable-item-shadow-effect-passive;

  p {
    text-align: center;
    font-family: $headline-font;
    color: $white-color;
    font-size: $f-2;
    padding-bottom: $offset-1;
  }

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  &.past-card::before {
    background-image: url('@/static/image/cards/past.png');
  }
  &.present-card::before {
    background-image: url('@/static/image/cards/present.png');
  }
  &.self-card::before {
    background-image: url('@/static/image/cards/self.png');
  }
  &.other-card::before {
    background-image: url('@/static/image/cards/other.png');
  }
}
</style>

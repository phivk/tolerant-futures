<template>
  <div :style="styleObject" class="card-item" :class="classObject">
    <p class="lh-title"><slot></slot></p>
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
    draggableState: {
      type: String,
      default: 'placed',
    },
    canDropOnDropZone: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styleObject() {
      const colorADist = (1 - this.value - 0.25) * 100
      const colorBDst = (1 - this.value + 0.25) * 100

      if (this.value !== null && this.draggableState !== 'placing') {
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
      } else {
        return ''
      }
    },
    classObject() {
      if (this.canDropOnDropZone && this.draggableState === 'placing') {
        return 'can-drop'
      } else {
        return this.draggableState
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

  @media (max-width: $query-mobile) {
    width: $card-item-width-mobile;
    height: $card-item-height-mobile;
  }

  @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) and (orientation: landscape) {
    width: $card-item-width-mobile-landscape;
    height: $card-item-height-mobile-landscape;
  }

  p {
    text-align: center;
    font-family: $headline-font;
    color: $white-color;
    font-size: $f-2;
    padding-bottom: $offset-1;

    @media (max-width: $query-mobile) {
      font-size: $f-4;
      line-height: $f-4;
    }

    @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) and (orientation: landscape) {
      font-size: calc($f-5 + 0.1rem);
      line-height: calc($f-5 + 0.1rem);
    }
  }

  &.placing {
    filter: $draggable-item-shadow-effect-placing;
  }

  &.placed {
    filter: $draggable-item-shadow-effect-placed;
  }

  &.can-drop {
    filter: $draggable-item-shadow-effect-can-drop
      $draggable-item-shadow-effect-can-drop;
  }

  &.placed-spectrum {
    filter: $draggable-item-shadow-effect-placed;
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

  &.self-card::after,
  &.other-card::after {
    position: absolute;
    font-family: $headline-font;
    color: $metallic-gray;
    font-size: $f-5;

    @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
      font-size: $f-6;
    }
  }

  &.self-card::after {
    content: 'your choice';
    bottom: 32px;
    @media (max-width: $query-mobile) {
      bottom: 22px;
    }
    @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
      font-size: $f-6;
      bottom: 20px;
    }
  }

  &.other-card::after {
    bottom: 14px;
    @media (max-width: $query-mobile) {
      bottom: 20px;
    }
    @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
      font-size: $f-6;
      bottom: 16px;
    }
  }

  &.other-card.guess::after {
    content: 'your guess';
  }
  &.other-card.true::after {
    content: "the other's choice";
  }
}
</style>

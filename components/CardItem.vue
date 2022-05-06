<template>
  <div class="card-item" :class="isPresentCard ? 'present-card' : 'past-card'">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isPresentCard: {
      type: Boolean,
      default: false,
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
  font-family: $headline-font;
  padding: $offset-2;
  box-sizing: border-box;
  font-size: $f-2;
  // hack to fix the bug where on iOS an animated element with filter would leave ugly trail 
  //-webkit-transform: translateZ(0); 
  filter: $draggable-item-shadow-effect-passive;

  &.present-card {
    color: $black-color;
    background-color: $present-card-item-color;
  }

  &.past-card {
    color: $white-color;
    background-color: $past-card-item-color;
  }

  &::before {
    position: absolute;
    content: '';
    width: $card-item-inner-width;
    height: $card-item-inner-height;
    border-style: solid;
    border-radius: $border-radius-1;
    border-color: $card-item-outline-color;
    border-width: $border-width-2;
  }
}
</style>

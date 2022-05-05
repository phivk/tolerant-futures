<template>
  <li>
    <slot></slot>
    <span class="other-user-spectrum-gradient" :class="gradientStyle">
      <span class="other-user-circle" :style="{left: positionStyle}"></span>
    </span>
  </li>
</template>

<script>
export default {
  props: {
    /* all gradientStyle classes passed to this component are generated in ~/assets/scss/gradients.scss */
    gradientStyle: {
      type: String,
      required: true,
      default: null,
    },
    otherUserPosition: {
      type: Number,
      required: true,
      default: null,
    },
  },
  computed: {
     positionStyle() {
      let n = Math.round(this.otherUserPosition * 100)
          n = Math.max( 10, Math.min(n, 90) )
          n = n + '%'
      return n
     } 
  },
}
</script>

<style scoped lang="scss">

li {
  position: relative;
  width: 100%;
  height: $ch3-other-user-spectrum-height;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .other-user-spectrum-gradient {
    position: absolute;
    width: 100%;
    height: 100%;   
    filter: blur($blur-1);

    .other-user-circle {
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

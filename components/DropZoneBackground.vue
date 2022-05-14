<template>
  <span class="drop-zone-wrapper">
  		<span class="drop-zone-gradient" :style="styleObject" :class="classObject">

  		</span>
  </span>
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
    animationState: {
      type: String,
      default: "PASSIVE"
    }    
  },
  computed: {
    styleObject() {
      return {
        background:
          'linear-gradient(90deg, ' +
          this.colorA +
          ' 25%, ' +
          this.colorB +
          ' 75%)',
      }
    },
    classObject() {
      switch(this.animationState) {
      case "PASSIVE":
        return "animate-passive"
      case "DRAGGING":
        return "animate-dragging"
      default:
        return undefined
    } 

    }
  },
}
</script>

<style scoped lang="scss">

  .drop-zone-wrapper {
    //z-index: $z-1;
    position: absolute;
    left: -7%;
    width: 110%;
    height: 100%;
    filter: blur($blur-3);

    .drop-zone-gradient {
        display: block;
  		width: 100%;
  		height: 100%;

        &.animate-passive {
          animation: anim 0.75s ease-out infinite alternate;
        } 
        &.animate-dragging {
          animation: anim 0.3s ease-out infinite alternate;

        }  
    }
  }

@keyframes anim {
    0% {
        transform: scaleY(1.0);
        filter: brightness(1.0);
    }
    100% {
        transform: scaleY(1.07);
       	filter: brightness(1.15);
    }
}
</style>

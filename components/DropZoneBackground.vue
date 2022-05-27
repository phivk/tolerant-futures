<template>
  <span class="drop-zone-wrapper">
  		<span class="drop-zone-gradient" :style="styleObject" :class="draggableState">
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
    draggableState: {
      type: String,
      default: "placed"
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

        &.placed-spectrum {
          animation: frames-placed-spectrum 0.35s forwards ease-out;
        } 

        &.placed {
          animation: frames-placed 1s ease-out infinite alternate;
        } 

        &.placing {
          animation: frames-placing 0.3s ease-out infinite alternate;
        }  
    }
  }

@keyframes frames-placed-spectrum {
    0% {
        transform: scaleY(1.1);
        filter: brightness(1.1);
    }
    100% {
        transform: scaleY(1.0);
       	filter: brightness(1.0);
    }
}

@keyframes frames-placed {
    0% {
        transform: scaleY(1.0);
        filter: brightness(1.0);
    }
    100% {
        transform: scaleY(1.08);
        filter: brightness(1.15);
    }
}

@keyframes frames-placing {
    0% {
        transform: scaleY(1.0);
        filter: brightness(1.0);
    }
    100% {
        transform: scaleY(1.15);
        filter: brightness(1.1);
    }
}

</style>

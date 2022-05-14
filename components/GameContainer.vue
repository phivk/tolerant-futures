<template>
  <section
    class="w-100 h-100 relative flex flex-column justify-between items-center relative"
  >
    <slot> </slot>
  </section>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
section {
  position: relative;
  overflow: hidden;
  background-color: $background-color;

  &:before {
  	width: 100%;
  	height: 100%;
  	position: absolute;
  	content: "";
  	background-size: cover;
  	background-image: url('@/static/image/noise_lowres.jpg');  
  	mix-blend-mode: screen;	
  	opacity: 0.7;
  }
}
</style>

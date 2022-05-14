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

  // background noise texture
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
  // background elliptical shadow
  &:after {
  	width: 100%;
  	height: 100%;
  	position: absolute;
  	content: "";
	background: radial-gradient(ellipse, rgba(255,255,255,0) 30%, rgba(16, 6, 43,0.35) 90%); 
  	mix-blend-mode: multiply;	
  }  
}


// background: radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(0,212,255,1) 70%); 
</style>



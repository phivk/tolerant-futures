<template>
	<span :class="style"></span>
</template>

<script>
	/* all gradientStyle classes passed to this component are generated in ~/assets/scss/gradients.scss */

	export default {
		props: {
			gradientStyle: {
				type: String,
				required: true,
				defaul: null
			}
		},
		data() {
			return {
				style: "drop-zone-background" + " " + this.gradientStyle,
			}
		}
	}
</script>

<style scoped lang="scss">
  .drop-zone-background {
    z-index: $z-1;
    position: absolute;
    left: -7%;
    width: 110%;
    height: 100%;
	filter: blur($blur-3);
  }
</style>



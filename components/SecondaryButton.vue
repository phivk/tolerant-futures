<template>
	<button class="secondary-button" @click="handleClick"><slot></slot></button>
</template>

<script>
export default {
	methods: {
		handleClick() {
	      this.$emit("buttonClicked", {});
	  	}
	}
}
</script>

<style scoped lang="scss">
 .secondary-button {
 	font-family: $headline-font;
 	font-size: $f-4;
 	box-sizing: border-box;
 	color: $white-color;
	padding: $offset-2;
	border-radius: $border-radius-1;
	border-width: $border-width-2;
	border-color: $white-color;
	background-color: $background-color;
	outline:none;
  	border-style: solid;	
  	filter: $secondary-button-shadow-effect;
 }
</style>



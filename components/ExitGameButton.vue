<template>
	<button class="exit-game-button"><img src="@/static/svg/exit_game_icon.svg"/></button>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
 .exit-game-button {
 	box-sizing: border-box;
	width: $exit-game-button-width;
	height: $exit-game-button-width;
	padding: $offset-2;
	border-radius: $border-radius-1;
	border-width: $border-width-1;
	border-color: $button-outline-color;
	background-color: $action-color;
 }
</style>



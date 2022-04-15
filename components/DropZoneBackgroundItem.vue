<template>
	<span class="drop-zone-background"></span>
</template>
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

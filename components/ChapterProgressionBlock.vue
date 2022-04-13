<template>
  <li> </li>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
	li {
		width: 30px;
		height: 30px;
    background-color: $signal-color; 
    border-radius: $border-radius-1;
    filter: blur($blur-1);

    .level_completed {
      filter: blur(0);
    }
	}

</style>



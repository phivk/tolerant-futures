<template>
  <button class="exit-game-button">
    <img src="@/static/svg/exit_game_icon.svg" />
  </button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('buttonClicked', {})
    },
  },
}
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
  border-style: solid;
  background-color: $action-color;
  outline: 0;
  filter: $secondary-button-shadow-effect;
}
</style>

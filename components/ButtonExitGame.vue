<template>
  <span class="button-exit-game" @click="onClick">
    <img src="@/static/svg/exit_game_icon.svg" />
  </span>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit('buttonClicked', {})
    },
  },
}
</script>

<style scoped lang="scss">
.button-exit-game {
  box-sizing: border-box;
  display: inline-block;
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
  cursor: pointer;
}
</style>

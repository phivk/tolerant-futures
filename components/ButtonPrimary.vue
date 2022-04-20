<template>
  <button class="button-primary" @click="handleClick"><slot></slot></button>
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
.button-primary {
  font-family: $headline-font;
  font-size: $f-2;
  box-sizing: border-box;
  padding: $offset-3;
  border-radius: $border-radius-1;
  background-color: $white-color;
  border: none;
  outline: none;
  filter: $main-button-shadow-effect;
}
</style>

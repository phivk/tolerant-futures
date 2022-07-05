<template>
  <button class="button-secondary" @click="handleClick">
    <slot></slot>
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
.button-secondary {
  font-family: $headline-font;
  font-size: $f-4;
  box-sizing: border-box;
  color: $light-gray;
  padding: $offset-2;
  border-radius: $border-radius-1;
  border-width: $border-width-2;
  border-color: $gray;
  background-color: $background-color;
  outline: none;
  filter: $secondary-button-shadow-effect;

  @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
    font-size: $f-5;
  }

  &.outlined {
    background: none;
    border: 1px solid $white-color;
    color: $white-color;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>

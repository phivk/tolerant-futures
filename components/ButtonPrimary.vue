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
  max-width: $main-button-max-width;
  font-family: $headline-font;
  font-size: $f-2;
  text-align: center;
  box-sizing: border-box;
  padding: $offset-3;
  border-radius: $border-radius-1;
  background-color: $white-color;
  border: none;
  outline: none;
  filter: $main-button-shadow-effect;
  color: $black-color;

  @media (max-width: $query-mobile-landscape) {
    font-size: $f-3;
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

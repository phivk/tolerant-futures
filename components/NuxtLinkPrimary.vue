<template>
  <NuxtLink class="link-primary" :to="nextPath" :append="nextPathAppend">
    <slot></slot>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    nextPath: {
      type: String,
      required: true,
      default: null,
    },
    nextPathAppend: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style scoped lang="scss">
.link-primary {
  width: 100%;
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
  text-decoration: none;
  color: $black-color;
}
</style>

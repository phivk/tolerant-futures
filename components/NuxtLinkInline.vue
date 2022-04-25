<template>
  <NuxtLink class="link-inline" :to="nextPath" :append="nextPathAppend">
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
  },
  nextPathAppend: {
    type: Boolean,
    required: false,
    default: true,
  },     
}
</script>

<style scoped lang="scss">
.link-inline {
  font-family: $text-font;
  font-size: $f-5;
  display: inline;
  color: $black-color;
}
</style>

<template>
  <NuxtLink class="link-inline" :to="nextPath">
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
  }
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

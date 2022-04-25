<template>
  <section
    class="w-100 vh-100 relative"
  >
    <slot> </slot>
  </section>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
section {
  overflow: hidden;
  background-color: $background-color;
}
</style>

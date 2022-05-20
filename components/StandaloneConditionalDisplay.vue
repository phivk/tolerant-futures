<template>
  <section class="white">
    <div class="d-browser">Browser!</div>
    <div class="d-standalone">Standalone!</div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style scoped>
.d-standalone {
  display: none;
}
@media all and (display-mode: standalone) {
  .d-browser {
    display: none;
  }
  .d-standalone {
    display: initial;
  }
}
</style>

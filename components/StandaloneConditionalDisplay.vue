<template>
  <section class="white">
    <div class="dn-standalone db-browser">Browser!</div>
    <div class="dn-browser db-standalone">Standalone!</div>
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
@media all and (display-mode: standalone) {
  .db-standalone {
    display: block;
  }
  .dn-standalone {
    display: none;
  }
}
@media all and (display-mode: browser) {
  .db-browser {
    display: block;
  }
  .dn-browser {
    display: none;
  }
}
</style>

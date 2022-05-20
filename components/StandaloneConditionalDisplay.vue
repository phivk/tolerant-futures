<template>
  <section class="white">
    <div v-if="isStandalone">Standalone!</div>
    <div v-else>Browser!</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isStandalone: false,
    }
  },
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
  mounted() {
    if (window.navigator.standalone) {
      this.isStandalone = true
    }
  },
}
</script>

<style scoped>
.d-standalone-only {
  display: none;
}
@media all and (display-mode: standalone) {
  .d-browser-only {
    display: none;
  }
  .d-standalone-only {
    display: block;
  }
}
</style>

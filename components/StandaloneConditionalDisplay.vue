<template>
  <section class="white">
    <slot v-if="isStandalone" name="standalone"></slot>
    <slot v-else name="browser"></slot>
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

<template>
  <footer class="w-100 pa3">
    <slot></slot>
    <div v-if="shouldShowBack" class="ma3">
      <a href="" @click.prevent="onBackClick">Go Back</a>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    shouldShowBack() {
      return this.$router.currentRoute.path !== '/'
    },
  },
  methods: {
    onBackClick() {
      if (this.$nuxt.context.from) {
        this.$router.back()
      } else {
        this.$router.push({
          path: '/',
        })
      }
    },
  },
}
</script>

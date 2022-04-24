<template>
  <div class="flex flex-column justify-around items-center tc vh-100">
    <h1>{{ title }}</h1>
    <section>
      <div>Playing the Future Game...</div>
      <NuxtLink class="bg-white purple" :to="nextPath">
        {{ nextButtonText }}
      </NuxtLink>
    </section>
    <TheFooter> </TheFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Future',
      nextButtonText: 'Back to start',
      nextPath: '/',
    }
  },
  mounted() {
    this.$store.commit('setCurrentChapter', 'ch4')
  },
}
</script>

<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <section>
      <div>Playing the Future Game...</div>
      <NuxtLink to="/">Back to start</NuxtLink>
    </section>
    <TheFooter> </TheFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Future',
      nextPath: '/',
    }
  },
}
</script>

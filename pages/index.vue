<template>
  <div class="landing-page flex flex-column justify-around items-center tc vh-100">
    <h1>{{ title }}</h1>
    <NuxtLink class="bg-white purple" :to="nextPath">
      {{ nextButtonText }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Tolerant Futures',
      nextButtonText: 'Begin experience',
      nextPath: '/ch1',
    }
  },
}
</script>

<style>
  .landing-page {
    background-image: url('@/static/image/landing_page_background.jpg');
    object-fit: cover;
  } 
</style>

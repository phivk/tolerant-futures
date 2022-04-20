<template>
  <div class="landing-page vh-100">
    <div>
    <h1>{{ title }}</h1>
    <p> </p>
    <NuxtLink class="bg-white purple" :to="nextPath">
      {{ nextButtonText }}
    </NuxtLink>
    </div>
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

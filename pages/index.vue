<template>
  <div class="landing-page vh-100">
    <div>
    <h1>{{ title }}</h1>
    <p>{{ descriptionText }}</p>
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
      descriptionText: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
      nextPath: '/ch1',
    }
  },
}
</script>

<style scoped lang="scss">
  div.landing-page {
    background-image: url('@/static/image/landing_page_background.jpg');
    object-fit: cover;

    h1 {
      margin: 0;
    }
  } 
</style>

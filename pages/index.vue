<template>
  <div class="landing-page">
    <div class="wrapper">
      <div>
        <h1>{{ title }}</h1>
        <p class="pv3">
          Discover how concepts from the distant to recent past can reappear in
          our lives in unexpected ways. Share your own interpretations of
          connections between the past and the present and reflect on those of
          others.
        </p>
        <p class="pv3">
          This playful experience is based on research about Iron Age and Roman
          heritage in Modern Britain by the Universities of Edinburgh and
          Durham. Take part and contribute your vision for a collective
          imagination of tolerant futures.
        </p>
      </div>
      <NuxtLink class="link-primary ma3 w-100" :to="nextLinkPath">
        {{ nextLinkText }}
      </NuxtLink>

      <p class="pv3">
        <NuxtLink class="link-inline" to="/about">
          Read more about the Tolerant Futures research project
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Tolerant Futures',
      nextLinkText: 'Begin experience',
      nextLinkPath: '/consent',
    }
  },
}
</script>

<style scoped lang="scss">
div.landing-page {
  display: block;
  padding: $offset-4;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-image: url('@/static/image/landing_page_background.jpg');

  .wrapper {
    width: 25%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: $border-radius-2;
    padding: $offset-4;
    text-align: center;

    h1,
    p {
      display: block;
    }
  }
}
</style>

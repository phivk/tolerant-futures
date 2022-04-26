<template>
  <div class="landing-page">
    <div class="wrapper">
      <div>
        <h1>{{ title }}</h1>
        <p class="pv3">{{ projectDescription }}</p>
      </div>
      <NuxtLink class="ma3 link-primary" :to="nextLinkPath">
        {{ nextLinkText }}
      </NuxtLink>

      <p class="pv3">
        {{ aboutProjectDescription }}
        <NuxtLink class="link-inline" :to="aboutProjectPath">
          {{ aboutProjectLinkText }}
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
      projectDescription:
        'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
      aboutProjectPath: '/about',
      aboutProjectLinkText: 'read more',
      aboutProjectDescription:
        'This project is a result of tolerant futures project.',
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

    .link-primary {
      width: 100%;
    }

    h1,
    p {
      display: block;
    }
  }
}
</style>

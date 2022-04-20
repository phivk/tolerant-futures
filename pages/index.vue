<template>
  <div class="landing-page vh-100">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <p>{{ descriptionText }}</p>
      <NuxtLink class="bg-white purple" :to="nextPath">
        {{ nextButtonText }}
      </NuxtLink>
      <NuxtLink class="bg-white purple" :to="aboutProjectPath">
        {{ aboutProjectText }}
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
      aboutProjectPath: '/about',
      aboutProjectText: 'read more',

    }
  },
}
</script>

<style scoped lang="scss">
  div.landing-page {
      display: block;
      padding: $offset-4;    
      background-image: url('@/static/image/landing_page_background.jpg');
      object-fit: cover;

    .wrapper {
      width: 20%;
      min-width: 300px;      
      background-color: rgba(255,255,255,0.5); 
      border-radius: $border-radius-2;
      padding: $offset-4;

      h1, p, a {
        display: block;
      }

      p {
        font-family: $text-font;
        font-size: $f-5;
        margin: $offset-4 0;
      }
    }
  } 
</style>

<template>
  <div class="informed-consent-page">
    <div class="wrapper">
      <div>
        <h1>{{ title }}</h1>
        <p class="pv3">{{ informedConsentText }}</p>
      </div>
      <NuxtLinkPrimary class="ma3" :next-path="nextLinkPath">
        {{ nextLinkText }}
      </NuxtLinkPrimary>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Informed Consent',
      nextLinkText: 'I accept',
      nextLinkPath: '/ch1',      
      informedConsentText: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
    }
  },
}
</script>

<style scoped lang="scss">
  div.informed-consent-page {
      display: flex;
      align-items: center;
      justify-content: center;      
      padding: $offset-4;
      width: 100%;
      height: 100vh;
      background-size: cover;      
      background-image: url('@/static/image/landing_page_background.jpg');

    .wrapper {
      width: 50%;
      min-width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;      
      background-color: rgba(255,255,255,0.5); 
      border-radius: $border-radius-2;
      padding: $offset-4;
      text-align: center;

      h1, p {
        display: block;
      }

      p {
        font-family: $text-font;
        font-size: $f-5;
      }
    }
  } 
</style>

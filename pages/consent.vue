<template>
  <div class="informed-consent-page">
    <div class="wrapper">
      <div>
        <h1>{{ title }}</h1>
        <p class="pv3">{{ informedConsentText }}</p>
      </div>
      <NuxtLink class="ma3 link-primary" :to="nextLinkPath">
        {{ nextLinkText }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Informed Consent',
      nextLinkText: 'I consent to this use of the data',
      nextLinkPath: '/ch1',
      informedConsentText:
        'While interacting with this artwork, you will be asked questions. No personal data is collected and your answers will be stored anonymously. They will be used by the Tolerant Futures project team at the University of Edinburgh and Durham University to understand more about the ways in which people associate past and present. Results will be published in academic publications.',
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
  background-position: left;


  @media (orientation: landscape) {
    background-image: url('@/static/image/landing_page_background.jpg');
      background-position: center;
      padding: $offset-3;
  }
  @media (orientation: portrait) {
    background-image: url('@/static/image/landing_page_background_mobile.jpg');
  }

  .wrapper {
    width: 50%;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: $border-radius-1;
    padding: $offset-4;
    text-align: center;

    @media (max-width: $query-mobile) {
      width: 100%;
      min-width: auto;
    }

    @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) {
      width: 100%;
      padding: $offset-3;
    }

    h1,
    p {
      display: block;
    }
  }
}
</style>

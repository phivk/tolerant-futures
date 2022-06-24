<template>
  <section class="chapter-opening">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <p class="large-paragraph">{{ paragraph }}</p>
      <slot></slot>
      <NuxtLink
        v-if="showButton"
        class="link-primary"
        :to="nextPath"
        :append="nextPathAppend"
      >
        {{ buttonText }}
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: null,
    },
    paragraph: {
      type: String,
      required: true,
      default: null,
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Continue',
    },
    showButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    nextPath: {
      type: String,
      required: false,
      default: 'play',
    },
    nextPathAppend: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style scoped lang="scss">
.chapter-opening {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: flex-column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-image: url('@/static/image/chapter_intro_background.jpg');
  overflow-x: hidden;

  @media (max-width: $query-mobile) {
    padding: $offset-3;
    background-image: url('@/static/image/chapter_intro_background_mobile.jpg');
    background-position: center;
  }

  &:before {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    background-size: cover;
    background-image: url('@/static/image/noise_lowres.jpg');
    mix-blend-mode: screen;
    opacity: 0.7;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,
    p {
      color: $white-color;
      text-align: center;
      filter: $caption-shadow-effect;
    }

    p {
      padding-top: $offset-2;
      padding-bottom: $offset-4;
      padding-left: $offset-7;
      padding-right: $offset-7;

      @media (max-width: $query-mobile-landscape) and (orientation: portrait) {
        padding-left: $offset-3;
        padding-right: $offset-3;
      }
      @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) and (orientation: landscape) {
        padding-bottom: $offset-2;
      }
    }
  }
}
</style>

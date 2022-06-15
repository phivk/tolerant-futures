<template>
  <section class="chapter-opening">
    <div class="wrapper">
      <SubtitlePlayer>
        {{ paragraph }}
      </SubtitlePlayer>
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
  background-image: url('@/static/image/future_chapter_background.jpg');

  @media (max-width: $query-mobile) {
    background-image: url('@/static/image/future_chapter_background_mobile.jpg');
    background-position: center;       
  }


  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1,
    p {
      color: $white-color;
      text-align: center;
    }

    p {
      filter: $caption-shadow-effect;
    }
  }
}
</style>

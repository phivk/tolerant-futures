<template>
  <section class="chapter-opening">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <p class="pt2 pb4 measure-wide">{{ paragraph }}</p>
      <NuxtLink class="link-primary" :to="nextPath" :append="nextPathAppend">
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

  &:before {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
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
    }

    p {
      filter: $caption-shadow-effect;
    }
  }
}
</style>

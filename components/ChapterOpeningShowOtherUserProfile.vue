<template>
  <section class="chapter-opening">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <p class="pt2 pb4 measure-wide">{{ paragraph }}</p>
      <div class="other_profile_container">
        <img src='~/static/image/the_other.png' v-show="!revealOtherConfirmed">
         <div class="holder" v-show="revealOtherConfirmed">
            <OtherUserSpectrumBackground gradientStyle="gradient-1"/>
            <OtherUserSpectrumBackground gradientStyle="gradient-2"/>
            <OtherUserSpectrumBackground gradientStyle="gradient-3"/>    
          </div>
      </div>
      <ButtonPrimary v-show="!revealOtherConfirmed" @buttonClicked="onRevealOtherConfirm">
        Reveal the Other
      </ButtonPrimary>

      <NuxtLink v-show="revealOtherConfirmed" class="link-primary" :to="nextPath" :append="nextPathAppend">
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
    otherUserProfile: {
      type: Array,
      required: true,
      default: null,
    },    
  },
 data() {
  return {
      revealOtherConfirmed: false,
    }
  },

  methods: {
    onRevealOtherConfirm() {
      this.revealOtherConfirmed = true
    }
  }

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

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .other_profile_container {
      height: 600px;
      width: 100%;
      .holder {
        width: 100%;
      }
    }

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

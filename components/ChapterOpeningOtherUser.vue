<template>
  <section class="chapter-opening">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <p class="pt2 pb4 measure-wide">{{ paragraph }}</p>
      <div class="profile-container">
        <img v-show="!revealOtherConfirmed" src='~/static/image/the_other.png' >

        <ul v-show="revealOtherConfirmed" class="spectra-container">
        <OtherUserSpectrum v-for="input in otherUserProfile" :key="input.id" gradient-style="gradient-1" :other-user-position="input.value" class="other-user-spectrum">
                <OtherUserSpectrumName>{{ input.spectrumLeft }}</OtherUserSpectrumName>
                <OtherUserSpectrumName>{{ input.spectrumRight }}</OtherUserSpectrumName>
          </OtherUserSpectrum>
        </ul>
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

    .profile-container {
      height: $ch3-other-user-profile-container-height;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .spectra-container {
        width: 100%;
        list-style: none;

        .other-user-spectrum {
          margin-bottom: $offset-4;

          &:last-of-type {
            margin-bottom: 0;
          }
        }
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

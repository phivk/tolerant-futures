<template>
  <section class="chapter-opening">
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <p class="pt2 pb4 measure-wide">{{ paragraph }}</p>
      <div class="profile-container">
        <img
          v-show="!revealOtherConfirmed"
          class="face-img"
          src="~/static/image/the_other.png"
        />
        <ul v-show="revealOtherConfirmed" class="spectra-container">
          <li v-for="input in otherUserProfileWithColors" :key="input.id">
            <SpectrumItem
              :color-a="input.colorA"
              :color-b="input.colorB"
              :spectrum-position="input.value"
            >
              <SpectrumName>{{ input.spectrumLeft }}</SpectrumName>
              <SpectrumName>{{ input.spectrumRight }}</SpectrumName>
            </SpectrumItem>
          </li>
        </ul>
      </div>
      <ButtonPrimary
        v-show="!revealOtherConfirmed"
        @buttonClicked="onRevealOtherConfirm"
      >
        {{ revealButtonText }}
      </ButtonPrimary>
      <NuxtLink
        v-show="revealOtherConfirmed"
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
import profileSpectra from '~/data/turns-ch1.json'

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
    revealButtonText: {
      type: String,
      required: false,
      default: 'Reveal the Other',
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
  computed: {
    otherUserProfileWithColors() {
      return this.otherUserProfile.map((item) => {
        const spectrum = profileSpectra.find(
          (s) => s.spectrumLeft === item.spectrumLeft
        )
        item.colorA = spectrum.colorA
        item.colorB = spectrum.colorB
        return item
      })
    },
  },
  methods: {
    onRevealOtherConfirm() {
      this.revealOtherConfirmed = true
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

    .profile-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .face-img {
        height: 370px;
        padding-bottom: $offset-3;
      }

      .spectra-container {
        width: 100%;
        list-style: none;
        padding-bottom: $offset-4;

        li {
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

<template>
  <div>
    <ChapterOpening :title="title" :paragraph="paragraph" :show-button="false">
      <div class="profile-container">
        <img
          v-show="!revealOtherConfirmed"
          class="face-img"
          src="~/static/image/the_other.png"
        />
        <SpectrumItemList
          v-show="revealOtherConfirmed"
          :spectra="otherUserProfileWithColors"
        />
      </div>
      <ButtonPrimary
        v-show="!revealOtherConfirmed"
        @buttonClicked="onRevealOtherConfirm"
      >
        Reveal the Other
      </ButtonPrimary>
      <NuxtLink
        v-show="revealOtherConfirmed"
        class="link-primary"
        :to="'play'"
        append
      >
        Continue
      </NuxtLink>
    </ChapterOpening>
  </div>
</template>

<script>
import chapters from '~/config/chapters'
import profileSpectra from '~/data/turns-ch1.json'
import { getTurnsSelfOtherAndProfile } from '~/util/game.js'
export default {
  data() {
    const chapterIndex = 2
    return {
      title: chapters[chapterIndex].title,
      paragraph1: chapters[chapterIndex].paragraph,
      paragraph2: chapters[chapterIndex].paragraph2,
      inputsOtherUserProfile: [],
      revealOtherConfirmed: false,
    }
  },
  computed: {
    otherUserProfileWithColors() {
      return this.inputsOtherUserProfile.map((item) => {
        const spectrum = profileSpectra.find(
          (s) => s.spectrumLeft === item.spectrumLeft
        )
        item.colorA = spectrum.colorA
        item.colorB = spectrum.colorB
        return item
      })
    },
    paragraph() {
      return !this.revealOtherConfirmed ? this.paragraph1 : this.paragraph2
    },
  },
  async mounted() {
    if (!this.$store.state.user) {
      this.$store.commit('setUser')
    }
    this.$store.commit('setCurrentChapter', 'ch3')

    // fetch inputCh1 for profile
    const { data: inputsCh1 } = await this.$supabase
      .from('inputCh1')
      .select('*')
      .not('user', 'is', null)
      .neq('user', this.$store.state.user) // not the current user

    // fetch inputCh2 for spectrum values
    const { data: inputsCh2 } = await this.$supabase
      .from('inputCh2')
      .select('*')
      .not('user', 'is', null)
      .neq('user', this.$store.state.user) // not the current user

    // generate turnsSelfOther along with profile
    const { profile, turns } = getTurnsSelfOtherAndProfile(inputsCh1, inputsCh2)

    this.inputsOtherUserProfile = profile
    this.$store.commit('setInputsOtherUserProfile', profile)
    this.$store.commit('setTurnsSelfOther', turns)
  },
  methods: {
    onRevealOtherConfirm() {
      this.revealOtherConfirmed = true
    },
  },
}
</script>
<style scoped lang="scss">
.profile-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: $offset-7;
  padding-right: $offset-7;

  @media (max-width: $query-mobile-landscape) and (orientation:portrait) {
      padding-left: $offset-3;
      padding-right: $offset-3; 
  }   


  .face-img {
    height: 370px;
    padding-bottom: $offset-3;

    @media (max-width: $query-mobile) {
      height: 250px;
      padding-bottom: $offset-2;
    }

    @media (min-width: $query-mobile) and (max-width:$query-mobile-landscape) {
        height: 125px;
        //margin-bottom: $offset-1;
    }    

  }
}
</style>

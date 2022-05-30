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
import { getRandomTurnsSelfOther } from '~/util/game.js'
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

    const { data: priorInputs } = await this.$supabase
      .from('inputCh2')
      .select('*')
      .not('user', 'is', null)
      .neq('user', this.$store.state.user)

    const turnsSelfOther = getRandomTurnsSelfOther(priorInputs, 3)
    this.$store.commit('setTurnsSelfOther', turnsSelfOther)

    const otherUser = turnsSelfOther[0].otherUser
    const { data: inputsOtherUserProfile } = await this.$supabase
      .from('inputCh1')
      .select('*')
      .eq('user', otherUser)
    this.inputsOtherUserProfile = inputsOtherUserProfile
    this.$store.commit('setInputsOtherUserProfile', inputsOtherUserProfile)
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

  .face-img {
    height: 370px;
    padding-bottom: $offset-3;
  }
}
</style>

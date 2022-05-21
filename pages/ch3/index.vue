<template>
  <div>
    <ChapterOpeningOtherUser
      :title="title"
      :paragraph="paragraph"
      :other-user-profile="inputsOtherUserProfile"
    />
  </div>
</template>

<script>
import chapters from '~/config/chapters'
import { getRandomTurnsSelfOther } from '~/util/game.js'
export default {
  data() {
    const chapterIndex = 2
    return {
      title: chapters[chapterIndex].title,
      paragraph: chapters[chapterIndex].paragraph,
      inputsOtherUserProfile: [],
    }
  },
  async mounted() {
    this.$store.commit('setCurrentChapter', 'ch3')

    const { data: priorInputs } = await this.$supabase
      .from('inputCh2')
      .select('*')
      .not('user', 'is', null)

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
}
</script>

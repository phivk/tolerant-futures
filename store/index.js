import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  user: null,
  currentChapter: null,
  turnsSelfOther: null,
  inputsOtherUserProfile: null,
})

export const mutations = {
  setUser(state) {
    state.user = uuidv4()
  },
  setCurrentChapter(state, chapter) {
    state.currentChapter = chapter
  },
  setTurnsSelfOther(state, turns) {
    state.turnsSelfOther = turns
  },
  setInputsOtherUserProfile(state, inputs) {
    state.inputsOtherUserProfile = inputs
  },
}

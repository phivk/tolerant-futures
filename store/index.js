import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  user: null,
  currentChapter: null,
  priorInputs: null,
})

export const mutations = {
  setUser(state) {
    state.user = uuidv4()
  },
  setCurrentChapter(state, chapter) {
    state.currentChapter = chapter
  },
  setPriorInputs(state, priorInputs) {
    state.priorInputs = priorInputs
  },
}

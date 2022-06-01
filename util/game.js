import spectra from '~/data/spectra.json'
import concepts from '~/data/concepts.json'
import {
  getRandomItemFromArray,
  getRandomItemsFromArray,
} from '~/util/array.js'

export const getSpectrumByLeft = (left) => {
  return spectra.find((spectrum) => spectrum.left === left)
}

export const getRandomTurnsPastPresent = (n) => {
  // pick n concepts randomly from list
  // then augment each concept with spectrum to build turn
  return getRandomItemsFromArray(concepts, n).map((concept) => {
    const conceptPresent = getRandomItemFromArray(concept.present)
    const spectrum = getRandomItemFromArray(spectra)
    return {
      concept: concept.past.name,
      caption: concept.past.caption,
      hint: concept.past.hint,
      conceptPresent: conceptPresent.name,
      captionPresent: conceptPresent.caption,
      spectrumLeft: spectrum.left,
      spectrumRight: spectrum.right,
      colorA: spectrum.colorA,
      colorB: spectrum.colorB,
    }
  })
}

/* https://stackoverflow.com/a/34890276 */
const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const getTurnsSelfOtherAndProfile = (inputsCh1, inputsCh2) => {
  // get users with complete chapter input for ch1 and ch2
  const inputsByUserCh1 = groupBy(inputsCh1, 'user')
  const usersCompleteCh1 = Object.keys(inputsByUserCh1).filter(
    (user) => inputsByUserCh1[user].length === 3
  )

  const inputsByUserCh2 = groupBy(inputsCh2, 'user')
  const usersCompleteCh2 = Object.keys(inputsByUserCh2).filter(
    (user) => inputsByUserCh2[user].length === 3
  )

  const usersCompleteBothChapters = usersCompleteCh1.filter((value) =>
    usersCompleteCh2.includes(value)
  )

  // pull a random set of inputs by same user across ch 1 and 2
  const randomUser = getRandomItemFromArray(usersCompleteBothChapters)

  const otherProfile = inputsByUserCh1[randomUser]
  const otherInputs = inputsByUserCh2[randomUser]
  const turnsSelfOther = otherInputs.map(buildTurnSelfOtherFromInput)

  return {
    profile: otherProfile,
    turns: turnsSelfOther,
  }
  // TODO fallback on default turns and profile?
}

const buildTurnSelfOtherFromInput = (input) => {
  const concept = concepts.find(
    (concept) => concept.past.name === input.conceptPast
  )
  const colorA = getSpectrumByLeft(input.spectrumLeft).colorA
  const colorB = getSpectrumByLeft(input.spectrumLeft).colorB
  return {
    concept: concept.past.name,
    caption: concept.past.caption,
    hint: concept.past.hint,
    valueOther: input.valuePast,
    feedbackOther: input.feedback,
    spectrumLeft: input.spectrumLeft,
    spectrumRight: input.spectrumRight,
    colorA,
    colorB,
    otherUser: input.user,
  }
}

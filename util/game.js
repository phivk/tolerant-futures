import spectra from '~/data/spectra.json'
import concepts from '~/data/concepts.json'
import {
  getRandomItemFromArray,
  getRandomItemsFromArray,
} from '~/util/array.js'

export const getRandomSpectrum = () => {
  return getRandomItemFromArray(spectra)
}

export const getRandomConceptPast = () => {
  return getRandomItemFromArray(concepts).past
}

export const getRandomConceptPastPresent = () => {
  const concept = getRandomItemFromArray(concepts)
  const conceptPresent = getRandomItemFromArray(concept.present)
  return {
    past: concept.past,
    present: conceptPresent,
  }
}

export const getRandomConceptSelfOther = (priorInputs) => {
  const input = getRandomItemFromArray(priorInputs)
  const concept = concepts.find(
    (concept) => concept.past.name === input.concept
  )
  return {
    self: concept.past,
    other: input,
  }
}

export const getRandomTurnPastPresent = () => {
  const conceptPair = getRandomConceptPastPresent()
  const spectrum = getRandomSpectrum()
  return {
    concept: conceptPair.past.name,
    caption: conceptPair.past.caption,
    hint: conceptPair.past.hint,
    conceptPresent: conceptPair.present.name,
    captionPresent: conceptPair.present.caption,
    spectrumLeft: spectrum[0],
    spectrumRight: spectrum[1],
  }
}

export const getRandomTurnSelfOther = (priorInputs) => {
  const conceptPair = getRandomConceptSelfOther(priorInputs)

  return {
    concept: conceptPair.self.name,
    caption: conceptPair.self.caption,
    hint: conceptPair.self.hint,
    conceptOther: conceptPair.other.concept,
    valueOther: conceptPair.other.value,
    captionOther: `Where do you think the other visitor placed ${conceptPair.other.concept} on this spectrum?`,
    spectrumLeft: conceptPair.other.spectrumLeft,
    spectrumRight: conceptPair.other.spectrumRight,
    otherUser: conceptPair.other.user,
  }
}

export const getRandomTurnsPastPresent = (n) => {
  // pick n randomly from concepts
  // then augment concepts with spectrum to build turn
  return getRandomItemsFromArray(concepts, n).map((concept) => {
    const conceptPresent = getRandomItemFromArray(concept.present)
    const spectrum = getRandomSpectrum()
    return {
      concept: concept.past.name,
      caption: concept.past.caption,
      hint: concept.past.hint,
      conceptPresent: conceptPresent.name,
      captionPresent: conceptPresent.caption,
      spectrumLeft: spectrum[0],
      spectrumRight: spectrum[1],
    }
  })
}

export const getRandomTurnsSelfOther = (priorInputs, n) => {
  return Array(n)
    .fill(0)
    .map((i) => getRandomTurnSelfOther(priorInputs))
}

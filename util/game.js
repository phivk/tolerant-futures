import { getRandomFromArray } from '~/util/array.js'
import spectra from '~/data/spectra.json'
import concepts from '~/data/concepts.json'

export const getRandomSpectrum = () => {
  return getRandomFromArray(spectra)
}

export const getRandomConceptPast = () => {
  return getRandomFromArray(concepts).past
}

export const getRandomConceptPastPresent = () => {
  const concept = getRandomFromArray(concepts)
  const conceptPresent = getRandomFromArray(concept.present)
  return {
    past: concept.past,
    present: conceptPresent,
  }
}

export const getRandomConceptSelfOther = (priorInputs) => {
  const input = getRandomFromArray(priorInputs)
  const concept = concepts.find(
    (concept) => concept.past.name === input.concept
  )
  return {
    self: concept.past,
    other: input,
  }
}

export const getRandomTurn = () => {
  const concept = getRandomConceptPast()
  const spectrum = getRandomSpectrum()
  return {
    concept: concept.name,
    caption: concept.caption,
    spectrumLeft: spectrum[0],
    spectrumRight: spectrum[1],
  }
}

export const getRandomTurnPastPresent = () => {
  const conceptPair = getRandomConceptPastPresent()
  const spectrum = getRandomSpectrum()
  return {
    concept: conceptPair.past.name,
    caption: conceptPair.past.caption,
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
    conceptOther: conceptPair.other.concept,
    valueOther: conceptPair.other.value,
    captionOther: `Where do you think the other visitor placed ${conceptPair.other.concept} on this spectrum?`,
    spectrumLeft: conceptPair.other.spectrumLeft,
    spectrumRight: conceptPair.other.spectrumRight,
    otherUser: conceptPair.other.user,
  }
}

export const getRandomTurns = (n) => {
  return Array(n)
    .fill(0)
    .map((i) => getRandomTurn())
}

export const getRandomTurnsPastPresent = (n) => {
  return Array(n)
    .fill(0)
    .map((i) => getRandomTurnPastPresent())
}

export const getRandomTurnsSelfOther = (priorInputs, n) => {
  return Array(n)
    .fill(0)
    .map((i) => getRandomTurnSelfOther(priorInputs))
}

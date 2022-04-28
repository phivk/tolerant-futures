import { getRandomFromArray } from '~/util/array.js'
import spectra from '~/data/spectra.json'
import concepts from '~/data/concepts.json'

export const getRandomSpectrum = () => {
  return getRandomFromArray(spectra)
}

export const getRandomConceptPast = () => {
  return getRandomFromArray(concepts).past
}

export const getRandomConceptPair = () => {
  const concept = getRandomFromArray(concepts)
  const conceptPresent = getRandomFromArray(concept.present)
  return {
    past: concept.past,
    present: conceptPresent,
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

export const getRandomPairTurn = () => {
  const conceptPair = getRandomConceptPair()
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

export const getRandomTurns = (n) => {
  return Array(n)
    .fill(0)
    .map((i) => getRandomTurn())
}

export const getRandomPairTurns = (n) => {
  return Array(n)
    .fill(0)
    .map((i) => getRandomPairTurn())
}

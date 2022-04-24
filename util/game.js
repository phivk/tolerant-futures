import { getRandomFromArray } from '~/util/array.js'
import spectra from '~/data/spectra.json'
import concepts from '~/data/concepts.json'

export const getRandomSpectrum = () => {
  return getRandomFromArray(spectra)
}

export const getRandomConceptPast = () => {
  return getRandomFromArray(concepts).past
}

export const getRandomConceptPresent = () => {
  const conceptsPresent = getRandomFromArray(concepts).present
  return getRandomFromArray(conceptsPresent)
}

export const getRandomTurn = () => {
  const concept = getRandomConceptPast()
  const spectrum = getRandomSpectrum()
  return {
    object: concept.name,
    spectrum_left: spectrum[0],
    spectrum_right: spectrum[1],
    caption: concept.caption,
  }
}

export const getRandomTurns = (n) => {
  return Array(n)
    .fill(0)
    .map((i) => getRandomTurn())
}

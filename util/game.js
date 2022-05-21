import spectra from '~/data/spectra.json'
import concepts from '~/data/concepts.json'
import {
  getRandomItemFromArray,
  getRandomItemsFromArray,
  uniqBy,
} from '~/util/array.js'

export const getRandomSpectrum = () => {
  return getRandomItemFromArray(spectra)
}

export const getSpectrumByLeft = (left) => {
  return spectra.find((spectrum) => spectrum.left === left)
}

export const getRandomTurnsPastPresent = (n) => {
  // pick n concepts randomly from list
  // then augment each concept with spectrum to build turn
  return getRandomItemsFromArray(concepts, n).map((concept) => {
    const conceptPresent = getRandomItemFromArray(concept.present)
    const spectrum = getRandomSpectrum()
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

export const getRandomTurnsSelfOther = (priorInputs, n) => {
  // build new array of unique inputs from priorInputs
  // then pick n inputs randomly from uniqueInputs
  // then augment each input to build turn
  const uniqueInputs = uniqBy(priorInputs, (input) => input.conceptPast)
  return getRandomItemsFromArray(uniqueInputs, n).map((input) => {
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
  })
}

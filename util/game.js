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
      spectrumLeft: spectrum[0],
      spectrumRight: spectrum[1],
    }
  })
}

export const getRandomTurnsSelfOther = (priorInputs, n) => {
  // build new array of unique inputs from priorInputs
  // then pick n inputs randomly from uniqueInputs
  // then augment each input to build turn
  const uniqueInputs = uniqBy(priorInputs, (input) => input.concept)
  return getRandomItemsFromArray(uniqueInputs, n).map((input) => {
    const concept = concepts.find(
      (concept) => concept.past.name === input.concept
    )
    return {
      concept: concept.past.name,
      caption: concept.past.caption,
      hint: concept.past.hint,
      conceptOther: input.concept,
      valueOther: input.value,
      captionOther: `Where do you think the other visitor placed ${input.concept} on this spectrum?`,
      spectrumLeft: input.spectrumLeft,
      spectrumRight: input.spectrumRight,
      otherUser: input.user,
    }
  })
}

/* 
  shuffle array truly randomly
  https://stackoverflow.com/a/12646864
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/* get a random item from array */
export const getRandomItemFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

/* get n random items from array */
export const getRandomItemsFromArray = (array, n) => {
  return shuffleArray(array).slice(0, n)
}

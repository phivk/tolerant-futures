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

/* 
  get unique items in array, as defined by key callback function 
  https://stackoverflow.com/a/9229821
*/
export const uniqBy = (array, key) => {
  const seen = new Set()
  return array.filter((item) => {
    const k = key(item)
    return seen.has(k) ? false : seen.add(k)
  })
}

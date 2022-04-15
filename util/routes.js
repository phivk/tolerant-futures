import chapters from '~/config/chapters'

export const getNextChapterRoute = (curChapterIndex) => {
  return curChapterIndex >= 0 && curChapterIndex < chapters.length - 1
    ? chapters[curChapterIndex + 1].route
    : null
}

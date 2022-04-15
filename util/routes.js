import chapterRoutes from '~/config/chapter-routes'

export const getNextRouteName = (currentRouteName) => {
  const index = chapterRoutes.indexOf(currentRouteName)
  return index >= 0 && index < chapterRoutes.length - 1
    ? chapterRoutes[index + 1]
    : null
}

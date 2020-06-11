module.exports = (themeOptions = {}) => {
  const basePath = themeOptions.basePath || `/posts`
  const categoriesPath = themeOptions.categoriesPath || `content/categories`
  const recipesPath = themeOptions.recipesPath || `content/recipes`
  const contentPath = themeOptions.contentPath || `content/posts`
  const assetPath = themeOptions.assetPath || `content/assets`

  return {
    basePath,
    assetPath,
    categoriesPath,
    contentPath,
    recipesPath,
  }
}

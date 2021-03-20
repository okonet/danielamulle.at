const smartypants = require("@silvenon/remark-smartypants")
const withMDX = require("next-mdx-frontmatter")({
  extension: /\.mdx?$/,
  MDXOptions: {
    remarkPlugins: [smartypants],
  },
})

module.exports = withMDX({
  i18n: {
    locales: ["de-AT"],
    defaultLocale: "de-AT",
  },
})

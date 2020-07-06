const {
  basePath,
  assetPath,
  recipesPath,
  categoriesPath,
  blogPath,
} = require("./paths")

module.exports = {
  siteMetadata: {
    title: "Daniela Mulle — Diätologin & Ernährungswissenschafterin",
    author: "Daniela Mulle",
    description: "Diätologin & Ernährungswissenschafterin",
    social: [
      {
        name: "Facebook",
        url: "facebook.com",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: "IBM Plex Sans",
            subsets: ["latin-ext"],
            variants: ["400", "400i", "700", "700i"],
          },
          {
            family: "IBM Plex Mono",
            subsets: ["latin-ext"],
            variants: ["400", "400i", "700", "700i"],
          },
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: { modulePath: `${__dirname}/src/cms/cms.js` },
    },
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-transformer-json`,
      // options: {
      //   typeName: ({ node, object, isArray }) => object.id,
      // },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${basePath}/${recipesPath}`,
        name: recipesPath,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${basePath}/${blogPath}`,
        name: blogPath,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${basePath}`,
        name: basePath,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${basePath}/${assetPath}`,
        name: assetPath,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "recipes",
        engine: "flexsearch",
        // engineOptions: "match",
        query: `
          {
            allRecipe {
              nodes {
                id
                title
                ingredients
              }
            }
          }
        `,
        ref: "id",
        index: ["title", "ingredients"],
        store: ["id"],
        normalizer: ({ data }) =>
          data.allRecipe.nodes.map(({ id, title, ingredients }) => ({
            id,
            title,
            ingredients,
          })),
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              // should this be configurable by the end-user?
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          { resolve: "gatsby-remark-copy-linked-files" },
          { resolve: "gatsby-remark-smartypants" },
        ],
        remarkPlugins: [require("remark-slug")],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    // "gatsby-plugin-no-javascript",
  ],
}

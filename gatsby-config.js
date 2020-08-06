const { basePath, assetPath, recipesPath, blogPath } = require("./paths")

module.exports = {
  siteMetadata: {
    title: "Daniela Mulle — Diätologin & Ernährungswissenschafterin",
    author: "Mag. Daniela Mulle",
    email: "contact@danielamulle.at",
    phone: "+43 650 9700569",
    role: "Diätologin & Ernährungswissenschafterin",
    description: "Ernährungswissenschafterin & Diätologin aus Leidenschaft",
    url: "https://danielamulle.at",
    lang: "de",
    locale: "de_AT",
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
    "gatsby-plugin-open-graph-images",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: { modulePath: `${__dirname}/src/cms/cms.js` },
    },
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: ({ node, object, isArray }) =>
          `${node.sourceInstanceName}CategoriesJson`,
      },
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
            allPost(filter: { collection: { eq: "recipes" } }) {
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
          data.allPost.nodes.map(({ id, title, ingredients }) => ({
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
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/logo@2x.png",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false,
        },
      },
    },
    // "gatsby-plugin-no-javascript",
  ],
}

module.exports = {
  siteMetadata: {
    title: "Daniela Mulle — Diätologin & Ernährungswissenschafterin",
    author: "Daniela Mulle",
    authorDegree: "Mag.",
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
      resolve: `gatsby-theme-content-collections`,
      options: {
        basePath: "content", // This is where the content is stored
        assetPath: "assets", // Path to assets referenced in the content relative to basePath
        collections: ["posts", "recipes", "testimonials"],
      },
    },
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
    "gatsby-plugin-theme-ui",
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
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: { modulePath: `${__dirname}/src/cms/cms.js` },
    },
  ],
}

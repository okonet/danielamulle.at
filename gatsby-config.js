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
    socialHandle: "bauchdetektivin",
  },
  plugins: [
    {
      resolve: `gatsby-theme-content-collections`,
      options: {
        basePath: "content", // This is where the content is stored
        assetPath: "assets", // Path to assets referenced in the content relative to basePath
        collections: [
          "posts",
          "recipes",
          "projects",
          "testimonials",
          "resources",
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
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "175080330711004",
      },
    },
  ],
}

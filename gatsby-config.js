module.exports = {
  siteMetadata: {
    title: "My Blog Title",

    author: "My Name",

    description: "My site description...",

    social: [
      {
        name: "Twitter",
        url: "https://twitter.com/gatsbyjs",
      },
      {
        name: "GitHub",
        url: "https://github.com/gatsbyjs",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
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
      resolve: "gatsby-source-filesystem",
      options: {
        path: "content/posts",
        name: "content/posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "content/assets",
        name: "content/assets",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
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
  ],
};

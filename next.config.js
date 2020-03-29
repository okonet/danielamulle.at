const smartypants = require("@silvenon/remark-smartypants");
const withMDX = require("next-mdx-frontmatter")({
  extension: /\.mdx?$/,
  MDXOptions: {
    remarkPlugins: [smartypants],
  },
});
module.exports = withMDX({
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
    };

    return config;
  },
});

var path = require("path");

module.exports = {
  // name: "Daniela Mulle",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "build/",
    filename: "[name].js",
    chunkFilename: "[name].[id].js"
  },
  plugins: [
  ],
  module: {
    loaders: [
      { test: /\.css$/, loaders: [
          "style-loader",
          "css-loader",
          "autoprefixer-loader?browsers=last 2 version"
        ]
      },
      { test: /\.(png|svg|jpg)$/, loader: "url?limit=15000" }
    ]
  },
  resolve: {
    root: path.join(__dirname, "src"),
    modulesDirectories: ["node_modules"],
    extensions: ["", ".webpack.js", ".js", ".css"],
    alias: {}
  }
};

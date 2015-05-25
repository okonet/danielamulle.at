var fs = require('fs');
var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

var html = fs.readFileSync('index.html', {encoding: 'utf8'});
var plugins = isProduction ? [
    new StaticSiteGeneratorPlugin('index.js', ['/'], { html: html })
] : [];

module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "_build"),
        publicPath: "/",
        filename: "index.js",
        chunkFilename: "[name].[id].js",
        /* IMPORTANT!
         * You must compile a module that can
         * can be required in a Node context: */
        libraryTarget: 'umd'
    },
    plugins: plugins,
    module: {
        loaders: [
            { test: /\.css$/, loaders: [
                "style-loader",
                "css-loader",
                "autoprefixer-loader?browsers=last 2 version"
            ]
            },
            { test: /\.scss$/, loaders: [
                "style-loader",
                "css-loader",
                "autoprefixer-loader?browsers=last 2 version",
                "sass-loader?includePaths[]=./src/css"
            ]
            },
            { test: /\.(png|svg|jpg)$/, loader: "url?limit=15000" },
            { test: /\.(ttf|otf|eot|woff|woff2)$/, loader: "file" },
        ]
    },
    resolve: {
        root: path.join(__dirname, "src"),
        modulesDirectories: ["node_modules"],
        extensions: ["", ".webpack.js", ".js", ".css", ".scss"],
        alias: {}
    }
};

const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = path.resolve(__dirname, "../");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
  process.env.BABEL_ENV = "development:web";
} else {
  process.env.BABEL_ENV = "production:web";
}

console.log("Node Environment: " + process.env.NODE_ENV); // eslint-disable-line
console.log("Babel Environment: " + process.env.BABEL_ENV); // eslint-disable-line

const babelLoaderConfiguration = {
  test: /\.js$/,
  include: [
    path.resolve(appDirectory, "src"),
    path.resolve(appDirectory, "node_modules/react-native-vector-icons"),
    path.resolve(appDirectory, "node_modules/react-native-web-linear-gradient"),
    path.resolve(appDirectory, "node_modules/react-native-linear-gradient"),
    path.resolve(appDirectory, "node_modules/react-native-material-textfield"),
    path.resolve(appDirectory, "node_modules/react-native-web-lists"),
    path.resolve(appDirectory, "node_modules/react-native-tab-view"),
    /strict-uri-encode/,
    /query-string/,
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: false,
      babelrc: true,
    },
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg|ico)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "./fonts/[hash].[ext]",
      },
    },
  ],
  include: [
    path.resolve(appDirectory, "src/assets/fonts"),
    path.resolve(appDirectory, "src/resources/fonts"),
    path.resolve(appDirectory, "node_modules/react-native-vector-icons"),
  ],
};

module.exports = {
  entry: ["@babel/polyfill", path.resolve(appDirectory, "src/index.js")],
  devtool: "source-map",

  output: {
    publicPath: "/",
  },

  module: {
    rules: [
      babelLoaderConfiguration,
      cssLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin(),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, "public/index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],

  resolve: {
    symlinks: false,
    extensions: [".web.js", ".js"],
    alias: {
      "react-native": "react-native-web",
      "react-native-linear-gradient": "react-native-web-linear-gradient",
      "react-native-web-linear-gradient": path.resolve(
        appDirectory,
        "node_modules/react-native-web-linear-gradient",
      ),
      "react-native-material-textfield": path.resolve(
        appDirectory,
        "node_modules/react-native-material-textfield",
      ),
      "styled-components": path.resolve(
        appDirectory,
        "node_modules/styled-components",
      ),
    },
  },

  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    contentBase: path.resolve(appDirectory, "public"),
    compress: false,
    port: 3000,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    watchContentBase: true,
  },
};

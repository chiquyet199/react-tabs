const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
    path.resolve(appDirectory, "index.js"),
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
  use: [MiniCssExtractPlugin.loader, "css-loader"],
};

const imageLoaderConfiguration = {
  oneOf: [
    {
      test: /favicons.*(gif|jpe?g|png|svg|ico)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    },
    {
      test: /\.(gif|jpe?g|png|svg|ico)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    },
  ],
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "./static/fonts/[hash].[ext]",
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

  module: {
    rules: [
      babelLoaderConfiguration,
      cssLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },

  output: {
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    publicPath: "/",
    path: path.resolve(appDirectory, "dist"),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash].css",
      chunkFilename: "static/css/[id].[hash].css",
    }),
    new CleanWebpackPlugin(["./*"], {
      root: path.resolve(appDirectory, "dist"),
      verbose: true,
    }),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
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
};

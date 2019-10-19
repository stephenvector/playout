const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  watch: true,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  devServer: {
    port: 3000,
    hot: false,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({
      template: require("html-webpack-template"),
      appMountId: "root",
      title: "prefab",
      headHtmlSnippet:
        '<meta name="viewport" content="initial-scale=1, maximum-scale=1">'
    })
  ]
};

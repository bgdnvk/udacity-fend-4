const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client"
  },
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    }),
    new CleanWebpackPlugin({
    // Simulate the removal of files
    //
    // default: false
    dry: true,
 
    // Write Logs to Console
    // (Always enabled when dry is true)
    //
    // default: false
    verbose: true,
 
    // Automatically remove all unused webpack assets on rebuild
    //
    // default: true
    cleanStaleWebpackAssets: false,
 
    // Do not allow removal of current webpack assets
    //
    // default: true
    protectWebpackAssets: false
    }),
    new webpack.DefinePlugin({
      app_port: 8000
    })
  ]
};

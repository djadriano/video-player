const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const resolvePathName = path => resolve(__dirname, path);

const foldersPath = {
  src: '../src',
  js: '../src/js',
  styles: '../src/styles',
  templates: '../src/templates',
  dist: '../dist',
};

module.exports = {
  entry: resolvePathName(`${foldersPath.js}/index`),
  devtool: 'inline-source-map',
  output: {
    path: resolvePathName(foldersPath.dist),
    filename: 'app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', 'jpg', 'png'],
    alias: {
      components: resolvePathName(`${foldersPath.js}/components`),
      constants: resolvePathName(`${foldersPath.js}/constants`),
      contexts: resolvePathName(`${foldersPath.js}/contexts`),
      hooks: resolvePathName(`${foldersPath.js}/hooks`),
      layouts: resolvePathName(`${foldersPath.js}/layouts`),
      utils: resolvePathName(`${foldersPath.js}/utils`),
      styles: resolvePathName(foldersPath.styles),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?sourceMap',
            options: { importLoaders: 1 },
          },
          {
            loader: 'sass-loader?sourceMap',
            options: {
              includePaths: [
                resolvePathName('../src/styles'),
                resolvePathName('../src/js'),
                resolvePathName('../assets'),
                resolvePathName('../node_modules'),
              ],
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    stats: 'errors-only',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    open: false,
  },
  context: resolvePathName(foldersPath.src),
  plugins: [
    new HtmlWebpackPlugin({
      template: `${foldersPath.templates}/index.html`,
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

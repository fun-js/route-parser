'use strict';

const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join } = require('path');

const copyTypings = new CopyWebpackPlugin(['src/index.d.ts']);

const isProduction = process.env.NODE_ENV === 'production';
const include = join(__dirname, 'src');

module.exports = {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'RouteParser',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include }
    ]
  },
  plugins: isProduction
    ? [new BabiliPlugin({}, { comments: false }), copyTypings]
    : [copyTypings]
};

'use strict';

const { join } = require('path');

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
  }
};

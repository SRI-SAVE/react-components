
'use strict';

let HtmlWebpackPlugin = require('html-webpack-plugin');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let merge = require('webpack-merge');
let path = require('path'); //.join(__dirname, 'build');
let wdsDebug = false;
let wpSandboxMode = process.env[ 'SAVE_MODE' ] || 'CAT';

// let TARGET = process.env.TARGET;
let ROOT_PATH = path.resolve(__dirname);

if (process.argv[ 1 ].match(/webpack-dev-server$/) != null) {
  wdsDebug = true;
}

let common = {
  entry: [
    './src/index.jsx',
  ],
  resolve: {
    // When requiring, you won't need to add these extensions
    extensions: [ '', '.js', '.jsx' ],
  },
  output: {
    path: path.dirname(),
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ },
    ],
    loaders: [
      { test: /\.jsx?$/, loaders: [ 'react-hot', 'babel' ], exclude: /node_modules/ },
      { test: /\.css$/, loaders: [ 'style', 'css' ], include: path.resolve(ROOT_PATH, 'src') },
      // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ],
  },
  eslint: {
    configFile: '.eslintrc',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__WEBPACK_SAVE_MODE__': JSON.stringify(wpSandboxMode),
      '__WEBPACK_DEV_SERVER_DEBUG__': wdsDebug,
    }),
    // new ExtractTextPlugin('bundle.css')
  ],
};

if (wdsDebug) {
  module.exports = merge(common, {
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:8080', // webpack-dev-server --inline
      'webpack/hot/only-dev-server', // webpack-dev-server --hot
    ],
    devServer: {
      historyApiFallback: true, // webpack-dev-server --history-api-fallback
      progress: true, // webpack-dev-server --progress
      // inline: true,
      // hot: true,
    },
    devtool: 'eval-source-map',// webpack-dev-server --devtool eval-source-map
    plugins: [
      new HtmlWebpackPlugin({
        title: 'SAVE React Components App',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
} else {
  module.exports = common;
}

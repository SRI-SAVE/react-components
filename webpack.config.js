/*
Copyright 2016 SRI International

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

let HtmlWebpackPlugin = require('html-webpack-plugin');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let chalk = require('chalk');
let merge = require('webpack-merge');
let path = require('path'); //.join(__dirname, 'build');
let wdsDebug = false;
let wpSandboxMode = process.env.SAVE_MODE || 'CAT';
let wdsNoff = false;

// let TARGET = process.env.TARGET;
let ROOT_PATH = path.resolve(__dirname);

if (process.argv.length > 2) {
  for (let arg of process.argv) {
    if (arg.match(/-eui/)) wpSandboxMode = 'EUI';
    if (arg.match(/-noff/)) wdsNoff = true;
  }
}

if (process.argv[ 1 ].match(/webpack-dev-server|webpack-dev-server.js$/) != null) {
  console.info(chalk.bgGreen('[ Running development ' + wpSandboxMode + ' debug mode ]'));
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
      { test: /\.css$/, loaders: [ 'style', 'css' ], include: [
        path.resolve(ROOT_PATH, 'src'),
        path.resolve(ROOT_PATH, 'node_modules/react-joyride/lib/styles'),
      ]},
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
      '__WEBPACK_DEV_SERVER_NO_FF__': wdsNoff,
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

var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path'); //.join(__dirname, 'build');
var wdsDebug = false;
var cosmosFixture = false;

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

if (process.argv[ 1 ].match(/webpack-dev-server$/) != null) {
  wdsDebug = true;
} else if (process.argv[ 1 ].match(/component-playground$/) != null) {
  cosmosFixture = true;
}

var common = {
  entry: [
    './src/index.jsx'
  ],
  resolve: {
    // When requiring, you won't need to add these extensions
    extensions: [ '', '.js', '.jsx' ],
  },
  output: {
    path: path.dirname(),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.jsx?$/, loaders: [ 'react-hot', 'babel' ], exclude: /node_modules/ },
      { test: /\.css$/, loaders: [ 'style', 'css' ], include: path.resolve(ROOT_PATH, 'src') }
      // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
    // new ExtractTextPlugin('bundle.css')
  ]
};

if (wdsDebug) {
  module.exports = merge(common, {
    entry: [
      'webpack-dev-server/client?http://0.0.0.0:8080', // webpack-dev-server --inline
      'webpack/hot/only-dev-server' // webpack-dev-server --hot
    ],
    devServer: {
      historyApiFallback: true, // webpack-dev-server --history-api-fallback
      colors: true, // webpack-dev-server --colors
      progress: true // webpack-dev-server --progress
      // inline: true,
      // hot: true,
    },
    devtool: 'eval', // webpack-dev-server --devtool eval
    plugins: [
      new HtmlWebpackPlugin({
        title: 'SAVE React Components App'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({ '__WEBPACK_DEV_SERVER_DEBUG__': wdsDebug })
    ]
  });
} else {
  module.exports = common;
}

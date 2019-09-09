const path = require('path');

const webpackMerge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');


const webpack = require('webpack');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('../common/config.js');

module.exports = webpackMerge.smart(common, {
  devtool: 'inline-source-map',
  entry: ['webpack/hot/poll?1000', path.join(__dirname, '../../src/index.js')],
  externals: [
    webpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(), 
    new HotModuleReplacementPlugin()
  ]
});
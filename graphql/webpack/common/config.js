const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: 'graphql-import-loader' }]
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../build')
  },
  resolve: {
    extensions: ['.js', '.graphql']
  },
  target: 'node'
};
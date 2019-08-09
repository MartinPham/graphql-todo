const path = require('path');

module.exports = {
  module: {
    rules: [
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../build')
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'node'
};
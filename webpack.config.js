var webpack = require('webpack');

module.exports = {
  entry: './src/js/server.js',
  output: {
		filename: './bundle.js'
  },
  target: 'node'
}

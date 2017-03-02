var webpack = require('webpack');

module.exports = {
  entry: './src/js/scraper.js',
  output: {
		filename: './bundle.js'
  },
  target: 'node'
}

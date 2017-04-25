const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  entry: [`${cwd}/src/index.js`],
  output: {
    path: `${cwd}/public`,
    publicPath: '/',
    filename: 'df-suggestion-box.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})
    }, {
      test: /\.svg$/,
      loader: 'file-loader'
    }]
  },
  devServer: {
    contentBase: path.join(cwd, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test Application',
      template: `${cwd}/index.ejs`
    }),
    new ExtractTextPlugin('styles.css')
  ]
};
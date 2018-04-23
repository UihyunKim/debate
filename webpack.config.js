const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dest = '/opt/lampp/htdocs/wp-multi/wp-content/themes/jesusdebate';
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('precss'), require('autoprefixer')];
              }
            }
          }, {
            loader: 'sass-loader'
          }
        ]
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('precss'), require('autoprefixer')];
              }
            }
          }
        ]
      }, {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg|gif)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, dest + '/inc/js')
  },
  plugins: [
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
    new CopyWebpackPlugin([
      {
        from: 'src/*.php',
        to: dest,
        flatten: true
      }, {
        from: 'src/inc',
        to: dest + '/inc',
      }, {
        from: 'src/screenshot.png',
        to: dest,
        flatten: true
      }, {
        from: 'src/img/*.*',
        to: dest + '/img',
        flatten: true
      }, {
        from: 'src/style.css',
        to: dest,
        flatten: true
      }
    ], {copyUnmodified: true}),
    new MiniCssExtractPlugin({
      filename: "../styles/main.css"
    })
  ]
}
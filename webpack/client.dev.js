const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./common');

const config = merge(common,{
  mode: 'development',
  devtool: "inline-source-map",
  entry: [
     path.resolve('.','client','client.tsx')
  ],
  output: {
    chunkFilename: 'client.bundle.js',
    filename: 'client.bundle.js',
    path: path.resolve('.','build')
  },
  devServer: {
   contentBase: path.resolve('.','build'),
   port: 9000,
   historyApiFallback: true
 },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[local]-[hash:base64]",
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'css-hot-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[local]-[hash:base64]",
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[local]-[hash:base64]",
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
         {
           loader: "file-loader",
           options: {
             name: `assets/img/[name].[ext]`,
           },
         },
       ],
     },
     {
       test: /\.(woff|woff2|(o|t)tf|eot)$/,
       use: [
          {
            loader: "file-loader",
            query: {
              name: `assets/fonts/[name].[ext]`,
            },
          },
        ],
     }
    ]
  },
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
      'CLIENT': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ]
});

module.exports = config;

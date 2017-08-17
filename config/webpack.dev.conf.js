import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import PACKAGE from '../package.json'

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: [
      path.resolve(__dirname, '../src/index')
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.join(__dirname, '../dist'),
    publicPath: './'
  },
  resolve: {
    modules: [path.join(__dirname, '../node_modules')],
    extensions: ['.web.js', '.jsx', '.js', '.json'],
    alias: {
      react: 'react/dist/react.min',
      // redux: 'redux/dist/redux.min',
      // 'react-redux': 'react-redux/dist/react-redux.min',
      'react-dom': 'react-dom/dist/react-dom.min',
      // 'react-router': 'react-router/umd/react-router.min',
      // echarts: 'echarts/dist/echarts.min',
      // moment: 'moment/min/moment.min',
      // ramda: 'ramda/dist/ramda.min',
      // 'antd-mobile': 'antd-mobile',
      // 'redux-saga': 'redux-saga',
      // lodash: 'lodash'
    }
  },
  module: {
    noParse: /moment/,
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            // ['transform-runtime', { polyfill: false }],
            // ['import', { style: true }]
          ],
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.less$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['index'],
      chunksSortMode: 'dependency',
      minify: false,
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      VERSION: '"' + PACKAGE.version + '"'
    })
  ],
  devtool: '#source-map',
  bail: true,
  cache: false,
}

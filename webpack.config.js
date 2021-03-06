const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pkg = require('./package.json')
const development = require('./build/webpack/development')
const production = require('./build/webpack/production')

const APP_ENV = process.env.APP_ENV || 'local'
const APP_PLATFORM = process.env.APP_PLATFORM || 'browser'

const {version} = require('./package.json')

const environment = fs.readFileSync(`./config/${APP_ENV}.js`).toString()
const platform = fs.readFileSync(`./config/${APP_PLATFORM}.js`).toString()

const config = `
      cfg = {};
      cfg.VERSION = '${version}';
      ${environment}
      ${platform}`

module.exports = (env, argv) => {
  const common = {
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'build/webpack/loaders')]
    },
    entry: './src/index.js',
    output: {
      filename: 'dist.js',
      path: path.resolve('www')
    },
    module: {
      rules: [
        {test: /\.pug$/, use: {loader: 'pug-loader', query: {}}},
        {test: /\.js$/, use: {loader: 'inline-template-loader', query: {}}},
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/fonts/'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{from: 'src/static', to: 'static', toType: 'dir'}]),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebpackPlugin({
        title: pkg.displayName,
        template: path.resolve('src', `index-${env.cordova ? 'cordova' : 'web'}.html`),
        hash: true,
        meta: {
          viewport: 'initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, width=device-width, viewport-fit=cover',
          'format-detection': 'telephone=no',
          'apple-mobile-web-app-capable': 'yes',
          'apple-mobile-web-app-status-bar-style': 'black-translucent'
        },
        templateParameters: {config}
      })
    ]
  }

  if (env.production) return merge(common, production(env, argv))
  return merge(common, development(env, argv))
}

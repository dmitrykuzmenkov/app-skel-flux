var ExtractText = require('extract-text-webpack-plugin');
var Copy = require('copy-webpack-plugin');
var LessClean = require('less-plugin-clean-css');
var HtmlFile = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
  dev: {
    html: {},
    loaders: {
      less: 'css!autoprefixer?browsers=last 5 version' +
        '!less?config=lessLoaderCustom',
      image: ['url?limit=8192&name=asset/[name].[ext]']
    },
    plugins: []
  },

  production: {
    devtool: 'source-map',
    html: {
      minify: {
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
      }
    },
    loaders: {
      less: 'css?sourceMap' +
        '!autoprefixer?browsers=last 5 version' +
        '!less?sourceMap=true&config=lessLoaderCustom',
      image: [
        'url?limit=8192&name=asset/[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "75-90", speed: 4}}'
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }
}[process.env.ENV || 'dev'];

module.exports = {
  cache: true,
  devtool: config.devtool,
  entry: [
    './main.js',
    './main.less'
  ],
  output: {
    path: 'build',
    filename: 'bundle.js',
    pathinfo: false
  },
  module: {
    loaders: [
      {
        test: /\.jext$/,
        loader: "jext"
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loaders: config.loaders.image
      }, {
        test: /\.less$/,
        loader: ExtractText.extract(config.loaders.less)
      }
    ]
  },
  lessLoader: {
    lessPlugins: [
      new LessClean({advanced: true})
    ]
  },
  plugins: Object.assign([
    new webpack.PrefetchPlugin('jext'),
    new webpack.PrefetchPlugin('edispatcher'),
    new webpack.PrefetchPlugin('domd'),
    new ExtractText('bundle.css'),
    new HtmlFile(Object.assign({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
      inject: 'head'
    }, config.html)),
    new Copy([
      { from: './asset', to: 'asset' }
    ])
  ], config.plugins)
};

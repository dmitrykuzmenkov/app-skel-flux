var ExtractText = require('extract-text-webpack-plugin');
var CopyFile = require('copy-webpack-plugin');
var LessClean = require('less-plugin-clean-css');
var HtmlFile = require('html-webpack-plugin');

module.exports = {
  cache: true,
  entry: [
    './main.js',
    './main.less'
  ],
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  devtool: "eval-source-map",
  module: {
    loaders: [
      {
        test: /\.jext$/,
        loader: "jext"
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?limit=8192&name=asset/[name].[ext]'
      }, {
        test: /\.less$/,
        loader: ExtractText.extract(
          'css?sourceMap' +
          '!autoprefixer?browsers=last 5 version' +
          '!less?sourceMap=true&config=lessLoaderCustom'
        )
      }
    ]
  },
  lessLoader: {
    lessPlugins: [
      new LessClean({advanced: true})
    ]
  },
  plugins: [
    new ExtractText('bundle.css'),
    new HtmlFile({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
      inject: 'head',
      minify: {
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
      }
    })
    // new CopyFile([
    //   { from: 'web/static/assets/robots.txt' }
    // ])
  ]
};

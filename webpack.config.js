var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var config = require('./config');
var StatsPlugin = require('stats-webpack-plugin');


var devOutput = _.extend({},config.output,{publicPath: config.previewUrl+config.assetsFolder+'/'});

if(config.hotReload){
  var devEntry = _.reduce(config.entry,function(entries,v,k){
    entries[k] = ['webpack-dev-server/client?'+config.previewUrl, 'webpack/hot/dev-server', v];
    return entries;
  },{});
  var devPlugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()]
} else {
  var devEntry = config.entry
  var devPlugins = [new webpack.NoErrorsPlugin()]
}

module.exports = {
  development:{
   browser: {
      name     : 'browser',
      devtool  : '#inline-source-map',
      devServer: true,
      entry    : devEntry,
      output   : devOutput,
      postcss  : config.postcss,
      resolve  : {
        extensions: config.extensions,
        moduleDirectories: config.moduleDirectories
      },
      module   : {loaders: config.loaders},
      plugins:  config.plugins.concat([
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('development') } })
      ]).concat(devPlugins)
    }
  },
  production:{
    browser: {
      name    : 'browser',
      entry   : config.entry,
      output  : config.output,
      postcss  : config.postcss,
      resolve : {
        extensions: config.extensions,
        moduleDirectories: config.moduleDirectories
      },
      module  : {loaders: config.loaders},
      plugins : config.plugins.concat([
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production') } }),
        new webpack.optimize.UglifyJsPlugin({
          comments: false,
          minimize:true,
          ascii_only:true,
          quote_keys:true,
          sourceMap: false,
          beautify: false,
          compress: { drop_console: true }
        }),
        new webpack.optimize.DedupePlugin(),
        new StatsPlugin('stats.json', { chunkModules: true, profile: true })
      ])
    }
  }
}

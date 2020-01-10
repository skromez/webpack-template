const webpack = require("webpack");
const path = require('path');
const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');


const devWebpackConfig = merge(commonWebpackConfig, {
  mode: 'development',

  module: {
    rules: [
      //Loading SASS/SCSS
      {
        test: /\.(s[ca]ss)$/,
        use:
          [
            'style-loader',
            {
              loader:'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: './postcss.config.js'
                }
              }
            },
            {
              loader:'sass-loader',
              options: { sourceMap: true }
            },
          ]
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ],
  devServer: {
    contentBase: commonWebpackConfig.externals.paths.dist,
    port: 8082,
    open: true,
    overlay: true
  }
});

module.exports = new Promise(((resolve, reject) => {
  resolve(devWebpackConfig)
}));
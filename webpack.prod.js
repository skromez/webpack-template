const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



const prodWebpackConfig = merge(commonWebpackConfig, {
  mode: 'production',

  module: {
    rules: [
      //Loading SASS/SCSS
      {
        test: /\.(s[ca]ss)$/,
        use:
          [
            MiniCssExtractPlugin.loader,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
    new CleanWebpackPlugin()
  ]
});

module.exports = new Promise(((resolve, reject) => {
  resolve(prodWebpackConfig)
}));
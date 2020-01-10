const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets/'
};


module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    main: PATHS.src,
  },

  output: {
    path: PATHS.dist,
    filename: '[name].[hash:7].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      // Compiling JS code through BABEL
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      },
      // Loading Images
      {
        test: /\.(jpg|png|jpeg|ico|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: `${PATHS.assets}/images`,
              name: '[name].[ext]'
            }
          }
        ]
      },
      // Loading Fonts
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: `${PATHS.assets}/fonts`,
              name: '[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack',
      template: 'public/index.html'
    })
  ]
};
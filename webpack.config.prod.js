const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        bundle: './src/main.js',
        vendor: [
            'vue',
            'vue-router',
            'vuex-router-sync',
            'vuex',
            'babel-polyfill'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                      minimize: true,
                      localIdentName: '[local]_[hash:base64:8]'
                  }
                }, 
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [
                      require('precss'),
                      require('autoprefixer')({browsers: ['ios >= 7.0', 'Android >= 4.0']})
                    ]
                  }
                }
              ]
            },
            {
              test: /\.less$/,
              exclude: /node_modules/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    localIdentName: '[local]_[hash:base64:8]'
                  }
                }, 
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [
                      require('precss'),
                      require('autoprefixer')({browsers: ['ios >= 7.0', 'Android >= 4.0']})
                    ]
                  }
                },
                {
                  loader: 'less-loader'
                }
              ]
            },
            {
              test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
              loader: 'file-loader?name=fonts/[name].[hash].[ext]'
            },
            {
              test: /\.(png|PNG|jpe?g|svg)$/,
              loader: 'url-loader?name=images/[name].[hash].[ext]&limit=5120'
            },
            {
              test: /\.(gif)$/,
              loader: 'file-loader?name=images/[name].[hash].[ext]'
            },
        ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, './src/index.html'),
          title: '这是生产prod'
      }),
      new CopyWebpackPlugin([
          {
              from: path.resolve(__dirname, './static'),
              to: path.resolve(__dirname, './dist/'),
              ignore: ['.*']
          }
      ]),
      new MiniCssExtractPlugin({
          filename: 'css/[name].css'
      })
    ],
    resolve: {
      extensions: ['.js', '.css', '.less', '.vue'],
      alias: {
          src: path.resolve(__dirname, './src'),
          'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.js')
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendor',
            chunks: 'initial',
            test: /node_modules\/(.*)\.js/
          }
        }
      }
    }
}
module.exports = webpackConfig
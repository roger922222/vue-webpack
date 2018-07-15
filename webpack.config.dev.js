const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    bundle: ['./src/main.js', './dev-client.js'],
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
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, './src/**'),
          exclude: [/node_modules/],
          options: {
            configFile: path.resolve(__dirname, './.eslintrc.js'),
            failOnWarning: true,
            failOnError: true,
            cache: true,
            formatter: require('eslint/lib/formatters/stylish'),
            formatter: require('eslint-friendly-formatter')
          }
      },
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
          {
            loader: 'vue-style-loader' 
          }, 
          {
            loader: 'css-loader',
            options: {
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
          {
            loader: 'vue-style-loader' 
          }, 
          {
            loader: 'css-loader',
            options: {
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
        title: '这是测试dev'
    }),
    new webpack.HotModuleReplacementPlugin()
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
require('./check-versions')()
require('shelljs/global')

process.env.NODE_ENV = 'production'

const ora = require('ora')

const webpack = require('webpack')

const webpackConfig = require('./webpack.config.prod')

const spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
})

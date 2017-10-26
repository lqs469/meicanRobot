import config from './config'
import express from 'express'
import webpack from 'webpack'
import webpackConfig from './config/webpack.dev.conf'
import webpackDevMiddleware from 'webpack-dev-middleware'
import pool from './db/pool'

const port = process.env.PORT || config.dev.port

const compiler = webpack(webpackConfig, (err, stats) => {
  console.log(err, stats)
})

const app = express()

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '',
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    chunks: false,
    colors: true
  }
})

app.use(devMiddleware)

app.get('/getAllData', function (req, res, next) {
  pool
    .connect('use meican;SELECT * FROM rest;')
    .then(data => {
      res.send({ data: data[1] })
    })
    .then(() => {
      next()
    })
})

app.listen(port, () => {
  console.log('Listening at http://0.0.0.0:' + port + '\n')
})

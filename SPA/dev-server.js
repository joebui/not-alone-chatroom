const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const compression = require('compression')

var config = require('./webpack.config.js')

const app = express()
const compiler = webpack(config)

app.set('port', (process.env.PORT || 8000))
app.use(compression())
app.use(express.static(__dirname + '/dist'))
app.use(webpackMiddleware(compiler, {
    stats: {
        colors: true
    }
}))
app.disable('x-powered-by')

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Listening on port ' + app.get('port'))
})  
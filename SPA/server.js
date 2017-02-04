const path = require('path')
const express = require('express')
const compression = require('compression')

const app = express()

app.set('port', (process.env.PORT || 8000))
app.use(compression())
app.use(express.static(__dirname + '/dist'))
app.disable('x-powered-by')

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Listening on port ' + app.get('port'))
})  
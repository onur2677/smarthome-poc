const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const lighting = require('./routes/lighting')
const {
  join
} = require('path')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/lightings', lighting)
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

module.exports = app

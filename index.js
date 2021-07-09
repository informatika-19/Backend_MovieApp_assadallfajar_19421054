const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const mongoURL = 'mongodb://localhost:27017/uasmovieapp'

mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('berhasil connect ke database')
}).catch(() => {
  console.log(e)
  console.log('gagal connect ke database')
})

const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))
app.use(cors())

app.use(bodyParser.json({
    extended: true,
    limit:'20mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit:'20mb'
}))


app.use('/user', require('./routes/user'))
app.use('/movie', require('./routes/Movie'))
app.use('/order',  require('./routes/Order'))

app.listen(3000, () => {
    console.log('Server Mulai')
})
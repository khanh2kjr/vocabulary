require('dotenv').config()
const port = 8000
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('Mongo database connected.')
  } catch (error) {
    console.log(error)
  }
}
connectMongoose()

const userRoute = require('./routes/user.route')
const typeRoute = require('./routes/type.route')
const vocabularyRoute = require('./routes/vocabulary.route')

app.use('/api/auth', userRoute)
app.use('/api/types', typeRoute)
app.use('/api/vocabularies', vocabularyRoute)

app.listen(port, () => console.log(`Server started on port ${port}`))

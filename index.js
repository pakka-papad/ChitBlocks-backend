const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

//-----------------------------------------------
const mongoose = require('mongoose')
const url =
  `mongodb+srv://chitblocks:chitBlocks@cluster0.vqurn.mongodb.net/chitblocks-app?retryWrites=true&w=majority`

mongoose.connect(url)

const userSchema = new mongoose.Schema({
  id : String,
  groupId : String,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const User = mongoose.model('User', userSchema)
//------------------------------------------------

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/users', (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})





const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const mongoose = require('mongoose')

const url =
  `mongodb+srv://chitblocks:chitBlocks@cluster0.vqurn.mongodb.net/chitblocks-app?retryWrites=true&w=majority`

mongoose.connect(url)

const userSchema = new mongoose.Schema({
  id : String,
  groupId : String,
})

const User = mongoose.model('User', userSchema)

const user = new User({
 id : 'abcd',
 groupId : 'abcd1234'
})

user.save().then(result => {
  mongoose.connection.close()
})
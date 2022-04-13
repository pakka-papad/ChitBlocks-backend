const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]

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
  console.log('user saved!')
  mongoose.connection.close()
})
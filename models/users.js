const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userAcc: {type:String},
    groupId: String,
    scheme : String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)
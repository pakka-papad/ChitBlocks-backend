const userRouter = require('express').Router()
const User = require('../models/users')

userRouter.get('/', (request, response) => {
  User.find({}).then(notes => {
    response.json(notes)
  })
})

userRouter.post('/', (request, response, next) => {
  const body = request.body

  const user = new User({
    userAcc: body.userAcc,
    groupId: body.groupId
  })

  user.save()
    .then(savedUser => {
      response.json(savedUser)
    })
    .catch(error => next(error))
})



module.exports = userRouter
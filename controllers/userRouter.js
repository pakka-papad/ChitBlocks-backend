const userRouter = require('express').Router()
const { response } = require('express')
const User = require('../models/users')

let userArray = []

userRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
})

userRouter.get('/:id', (request, response) => {
  User.findById(request.params.id)
  .then(user => {
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

userRouter.post('/', (request, response, next) => {
  const body = request.body
  var isPresent = false
  User.find({}).then(users => {
    userArray = users
    userArray.map(item => {

      if (item.userAcc == body.userAcc) { isPresent = true; }
    })
  }).then(
    () => {
      console.log('isPresent', isPresent)
      if (!isPresent) {
        const user = new User({
          userAcc: body.userAcc,
          groupId: body.groupId,
          scheme: body.scheme
        })

        user.save()
          .then(savedUser => {
            response.json(savedUser)
          })
          .catch(error => next(error))
      }
    }
  )

  userRouter.get('/:id', (request, response) => {
    User.findById(request.params.id)
    .then(user => {
      if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })
  

})



module.exports = userRouter
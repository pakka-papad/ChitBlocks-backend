const userRouter = require('express').Router()
const User = require('../models/users')

let userArray = []

userRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
})

userRouter.post('/', (request, response, next) => {
  const body = request.body
  var isPresent = false
  User.find({}).then(users => {
    userArray = users
    userArray.map(item => {
      console.log('item.userAcc', item.userAcc);
      console.log('body.userAcc', body.userAcc);
      console.log(item.userAcc == body.userAcc);

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

})



module.exports = userRouter
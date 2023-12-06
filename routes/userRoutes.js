const express = require('express')
const router = express.Router()

const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../coworkingControllers/userControllers')

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(findUserByPk)
    .put(updateUser)
    .delete(deleteUser)

router
   .route('/login')
   // .post(login)

module.exports = router
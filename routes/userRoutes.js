const express = require('express')
const router = express.Router()

router
   .route('/')
   .get((req, res) => {
      res.json('Page to Get User')
      console.log('Page to Get User')  
   })
   .post((req, res) =>{
      res.json('Page to Post/Create')
   })
   

router
   .route('/:id')
   .get((req, res) => {
      res.json('Page to Find user by ID')
   })
   .put((req, res) => {
      res.json('Page to edit user by id')
   })
   .delete((req, res) => {
      res.json('Page to Delete by ID')
   })



module.exports = router
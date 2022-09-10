const express = require('express')
const { default: mongoose } = require('mongoose')
const {updateUser,deleteUser, getUser, getAllUsers} = require('../controller/UserController.js')
const { verifyUser,verifyAdmin } = require('../middleware/AuthMiddleware.js')
const Route =express.Router()


Route.patch('/api/user/update/:id',verifyUser,updateUser)
Route.delete('/api/user/delete/:id',deleteUser)
Route.get('/api/user/:id',getUser)
Route.get('/api/user',getAllUsers)

 module.exports=Route
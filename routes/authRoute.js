const express = require('express')
const Route =express.Router()
const {requireAuth}= require('../middleware/AuthMiddleware.js')
const mongoose = require('mongoose')
const { inscription, login } = require('../controller/authContoller.js')




Route.post('/api/auth',inscription)
Route.post('/api/auth/login',login)




module.exports=Route
const express = require('express')
const Route =express.Router()
const {} = require('../controller/Hotelscontroller.js')
const{
    addHotel,showHotels,deleteHotel,updateHotel
}= require("../controller/Hotelscontroller")


const {verifyAdmin}= require('../middleware/AuthMiddleware.js')




Route.post('/api/add',addHotel)
Route.get('/api/hotel',showHotels)
Route.delete('/api/delete/:id',deleteHotel)
Route.patch('/api/patch/:id',verifyAdmin,updateHotel)







 
module.exports=Route;
const express = require('express')
const Route =express.Router()
const { countByCity, countTypes, searchHotel } = require('../controller/Hotelscontroller.js')
const{
    addHotel,showHotels,deleteHotel,updateHotel
}= require("../controller/Hotelscontroller")


const {verifyAdmin}= require('../middleware/AuthMiddleware.js')




Route.post('/add',addHotel)
Route.get('/hotel',showHotels)
Route.delete('/delete/:id',deleteHotel)
Route.patch('/patch/:id',verifyAdmin,updateHotel)
Route.get('/countByCity',countByCity)
Route.get('/countByTypes',countTypes)

Route.get('/hotel/find',searchHotel)






 
module.exports=Route;
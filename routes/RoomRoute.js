const express =  require ('express')
const { createRoom, deletingRoom } = require('../controller/roomsController')
const { verifyAdmin } = require('../middleware/AuthMiddleware')

const Route = express.Router()


Route.post('/api/rooms/:hotelId',verifyAdmin,createRoom)
Route.delete('/api/room/delete/:hotelId/:id',deletingRoom)



module.exports = Route


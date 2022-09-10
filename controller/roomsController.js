const mongoose = require('mongoose')

const hotels = require('../models/Hotels.js')

const rooms = require('../models/room.js')
const { ErrorHandler } = require('../utils/error.js')


const createRoom = async (req, res, next) => {

    /* const hotelId = req.params.hotelId

    const newRoom = new rooms(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
           

            await hotels.findByIdAndUpdate({_id:hotelId}, { $push: { rooms: savedRoom._id } })

            
        } catch (error) {
            next(error)
        }

       

    } catch (error) {
        next(error)
    }
 */
    const hotelId = req.params.hotelId;
    const newRoom = new rooms(req.body);
  
    try {

        if(!mongoose.Types.ObjectId.isValid(hotelId)){

                return next(ErrorHandler(401,'the type of id not valid '))
            }


      const savedRoom = await newRoom.save();
      try {
        await hotels.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedRoom);
    } catch (err) {
      next(err);
    }
}


const updateRoom = async (req, res, next) => {

    const id = req.params.id

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(ErrorHandler(404, 'id not valid'))
        }

        const items = await rooms.findByIdAndUpdate(id, { ...req.body })

        res.json({ items })



    } catch (error) {
        next(error)
    }

}


const deletingRoom = async (req, res, next) => {

    const { id } = req.params
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return next(ErrorHandler(404, 'id not valid '))


        }


        await rooms.findOneAndDelete({ _id:id })
       

        try {


             await hotels.findByIdAndUpdate(req.params.hotelId,{$pull : {rooms:req.params.id}})

            res.json({message:"delelteed successfuly "})


        } catch (error) {
            next(error)
        }

        

} catch (error) {
        next(error)
    }

}


module.exports={createRoom,updateRoom,deletingRoom}
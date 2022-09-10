const mongoose = require('mongoose')
const {ErrorHandler} = require ('../utils/error')
const hotel = require('../models/Hotels')


const addHotel = async(req,res,next)=>{
const {name,type,city,distance,adress,rooms}= req.body
 //if (true) return next(ErrorHandler(404,'hahakim')) 

try{
    const json = await hotel.create({name,type,city,distance,adress,rooms})

    res.json(json) 
}
catch (err){

 next(err)

}
}


const showHotels = async(req,res)=>{

    const hotels = await hotel.find()
    res.json(hotels)


}


const deleteHotel = async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
       return res.status(404).json({error:'no such workout'})
    }

    const item =await hotel.findOneAndDelete({_id:id}) 

    if (!item){
        return res.status(404).json({error:'no such workout'})
     }
     res.status(200).json(item)
     

}

const updateHotel= async(req,res,next)=>{
    try {
          const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
       return next(ErrorHandler(404,'type not valid '))
    }
    const item= await hotel.findOneAndUpdate({_id:id},{...req.body})
 res.json({item})
    } catch (error) {
        next(error)
    }
  
}





module.exports={addHotel,showHotels,deleteHotel,updateHotel}
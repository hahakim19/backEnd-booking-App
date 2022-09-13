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


const countByCity = async(req,res,next)=>{
    

     const cities = req.query.cities.split(",") 
     try {
        const list = await Promise.all(cities.map(city=>{
            return hotel.countDocuments({city:city})
        }))

        res.json({list})

     } catch (error) {
        next(error)
     }




}


const countTypes =async(req,res,next)=>{
    try {
         const countHotels =  await hotel.countDocuments({type:'hotel'})
         const countAppartement = await hotel.countDocuments({type:'appartement'})
         const countComplexe =  await hotel.countDocuments({type:'complexe'})
         const countVilla =  await hotel.countDocuments({type:'villa'})
         const countChalet =  await hotel.countDocuments({type:'chalet'})
         const countCottage =  await hotel.countDocuments({type:'cottage'})
         const countCamping =  await hotel.countDocuments({type:'camping de luxe'})
         const countMaison =  await hotel.countDocuments({type:'maison'})
         const countAppHotel =  await hotel.countDocuments({type:'appart hotel'})
         const countAuberge =  await hotel.countDocuments({type:'auberge'})

        res.json([

           {type:'hotel',count:countHotels },
           {type:"appartement",count:countAppartement},
           {type:"complexe",count:countComplexe},
           {type:"villa",count:countVilla},
           {type:"chalet",count:countChalet},
           {type:"cottage",count:countCottage},
           {type:"camping",count:countCamping},
           {type:"maison",count:countMaison},
           {type:"appart hotel",count:countAppHotel},
           {type:"auberge",count:countAuberge},
           

        ])


    } catch (error) {
        next(error)
    }
   
}

const searchHotel = async(req,res,next )=>{

    const {destination} = req.query

try {

    const items = await hotel.find({city:destination})

       res.json({items})


} catch (error) {
    next(error)
}

}



module.exports={addHotel,showHotels,deleteHotel,updateHotel,countByCity,countTypes,searchHotel}
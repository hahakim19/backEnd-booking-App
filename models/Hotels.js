const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const hotel= new Schema({

    name:{
        type:String,
        required:true,
    },


    type:{
        type:String,
        required:true,
    },


    city:{
        type:String,
        required:true,
    },

        adress:{
        type:String,
        required:true,
    },  
    
    distance:{
        type:Number,
        required:true,
    },  
    
    Photos:{
        type:[String],
       
    },   
    
    description:{
        type:String,
        
    },
    Rating:{
        type:Number,
        min:0,
        max:5,
    
    },
    rooms:{
        type: [String],
    },
    featured:{
        type:Boolean,
       default:false,
       
    },

},{timestamps:true})


module.exports=mongoose.model('hotel',hotel)

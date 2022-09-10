const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const room = new Schema({

    title: {
        type: String,
        required: true,

    },

    maxPeople: {
        type: Number,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

     roomNumbers:[{number:Number,unavailableDate:{type:[String]}}], 

    
},{timestamps:true}

)


module.exports=mongoose.model('rooms',room)
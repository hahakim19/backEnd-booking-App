const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const user = new Schema({

    userName: {
        type: String,
        required:true,
        unique:true,

    },

    FirstName: {
        type: String,
        required: true,

    },
    LastName: {
        type: String,
        required: true,

    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        default: false,
    }





},{timestamps:true})

module.exports = mongoose.model('Users', user)
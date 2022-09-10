const express = require('express')
require('dotenv').config()

const Route = require('./routes/HotelsRoute.js')
const authRoute = require('./routes/authRoute.js')
const UserRoute =require('./routes/UserRout.js')
const RoomRoute =  require('./routes/RoomRoute.js')

const mongoose= require('mongoose')
const app= express();

var cookieParser = require('cookie-parser')

mongoose.connect(process.env.LOCALDB)
.then((result)=>{
app.listen(process.env.PORT,(err)=>{
    if(!err) console.log('on watch PORT : ',process.env.PORT);
    else console.log('ya une err dans le serveur ',err);
})
console.log('DB connected');

})
.catch(err=>{

    console.log('there is an issus in db connection ....\n more details', err);

})

app.use(express.json())
app.use(cookieParser())

app.use(Route)
app.use(authRoute)
app.use(UserRoute)
app.use(RoomRoute)


//middleware for handling errors 
app.use((err,req,res,next)=>{

const errorStatus = err.status || 500 ; 
const errMessage = err.message || 'something is wrong !';
return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errMessage,
    stack:err.stack,

}) 

})
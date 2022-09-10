const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Users = require('../models/Users')
const {ErrorHandler} =require('../utils/error')




const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt 
   

    try {
        if (token) {

        jwt.verify(token,process.env.JWT, (err, decodedToken) => {

                if (err) {return next(ErrorHandler(404,'token dosent match'))}

                else {

                   
                    next()
                
                }

            })

        }

         else return next(ErrorHandler(404,'token not fund'))
         


    }

    catch (err) {

        next(err)
    }



}



const verifyUser = (req,res,next) =>{
    const token = req.cookies.jwt
    const  id=req.params.id
    try {

        if (token){
            jwt.verify(token,process.env.JWT, (err,decoded)=>{

                if (err) return next(ErrorHandler(505,'not compatible'))
                
                else {
                        if ( id===decoded.id ){
                            res.send('you can delete or update your account ')
                            next()
                        }
                   
                        else { return next(ErrorHandler(520,"you dont have the right ")) }
                   
                }
            
             })
        }
        else return next(404,'ya pas de token ')
        


    } catch (error) {
        next(error)
    }


}

const verifyAdmin= async(req,res,next)=>{
    const id = req.params.id
    const token = req.cookies.jwt
    try {

     

        if(token){

        jwt.verify(token,process.env.JWT,async(err,decoded)=>{

            if (err) return next(ErrorHandler(404,'not verifed '))
            else {
                const idDecoded = decoded.id
                  const data = await  Users.findOne({_id:idDecoded})
                 

                  if (data.isAdmin){

                    next()

                  }
                  else {
                     return next(ErrorHandler(404,'you are not admin you cant do this action '))
                  } 

               
             
            }


        })

        }
        else {
            next(ErrorHandler(404,'your token is not valid '))
        }
        
    } catch (error) {
        next(error)
    }

}







module.exports = { requireAuth,verifyUser,verifyAdmin }











/* 
requireAuth(req,res,()=>{

    if (req.Users._id===req.params.id || req.Users.isAdmin){
      
        next();
    }
    else {
        return next(ErrorHandler(404,'user not verified '))
    }
}) */
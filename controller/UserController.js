const { default: mongoose } = require("mongoose");
const Users = require("../models/Users");
const { ErrorHandler } = require("../utils/error.js")



const updateUser = async (req, res, next) => {
    

    const id = req.params.id

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(ErrorHandler(404, 'id not valid'))
        }

        let items = await Users.findOneAndUpdate({ _id: id }, { ...req.body })

        res.json({ items })

    }

    catch (err) {

        next(err)

    }


}


const deleteUser = async (req, res, next) => {
    let id = req.params.id

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(ErrorHandler(500, 'invalid id'))
        }

        let items = await Users.findOneAndDelete({ _id: id })
        res.json({ message: 'deleted successfuly' })
    }
    catch (err) {
        next(err)
    }

}



const getUser = async (req, res, next) => {
    let id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) { return next(ErrorHandler(404, 'invalid id ')) }
        let items = await Users.findById({ _id: id })
        if (items) {
            res.json({ items })

        }
        else {
            res.json({ message: 'username dose not exist ' })
        }

    }
    catch (err) {
        next(err)


    }

}

const getAllUsers = async (req, res, next) => {

    try {
        
        let users =await Users.find({})
        
            res.json({users})

        

    } catch (error) {
        next(error)
    }

}

module.exports = { updateUser, deleteUser, getUser ,getAllUsers}


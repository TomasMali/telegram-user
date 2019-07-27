

// this is a module DAO for Users
const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    menuId: Number,
    primo: {
        varieta_1 : String,
        varieta_2: String,
        varieta_3: String,
        varieta_4: String,
        varieta_5: String
    },
    secondo: {
        varieta_1 : String,
        varieta_2: String,
        varieta_3: String,
        varieta_4: String,
        varieta_5: String
    },
    contorno: {
        varieta_1 : String,
        varieta_2: String,
        varieta_3: String,
        varieta_4: String,
        varieta_5: String
    }
})

module.exports = mongoose.model('Menu', menuSchema) 
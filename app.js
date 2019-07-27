// This file is for handling request
const express = require('express')
const app = express();

const bodyParser = require('body-parser')

// improve productivity on development
const morgan = require('morgan')

const productRoutes = require('./api/routs/products')
const tomas = require('./api/routs/tomas')
const users = require('./api/routs/users/user')
const menu = require('./api/routs/menu/menu')
const menuDelGiorno = require('./api/routs/menuDelGiorno/menudelgiorno')

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://tommal:' + 'tommal' +
  '@first-db-3ldi1.mongodb.net/Restaurants?retryWrites=true', { useNewUrlParser: true })

// improve productivity on development
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding")
    if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
    return res.status(200).json({})
    }
    next()
})


// just go to the ather file if you pass me /products 
app.use('/products', productRoutes);
app.use('/tomas', tomas);
app.use('/users',users);
app.use('/menu',menu);
app.use('/menuDelGiorno',menuDelGiorno);



// if the user requires a path that doesnt exsists, i throw an error
app.use((req,ser,next)=>{
const error = new Error("Not found")
error.status = 404
next(error) // forword the request throut the appication
});

// i catch it here
app.use((error, req,res,next)=>{
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   })
})





module.exports = app;

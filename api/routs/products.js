const express = require('express')

const router = express.Router()

const Product = require('./product')

const mongoose = require('mongoose')


// First route /
router.get('/', (req, res, next) => {
    res.status(200).json({
        messageTomas: "products GET request"
    })
})


// POST REQUEST
router.post('/', (req, res, next) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(result => {
        console.log(result)
        res.status(200).json({
            messageTomas: "products POST request",
            createProduct: result
            
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });

    
})

// GET REQUEST
router.get('/:ID', (req,res,next)=>{
    const id = req.params.ID;

    Product.findById(id)
    .exec().
    then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
    res.status(500).json({error: err})
    })
})




// PATCH REQUEST
router.patch('/:ID', (req, res, next) => {
    const id = req.params.ID;
    res.status(200).json({
        messageTomas: "Updated product PATCH!",
        ProductId : id
    })
})

router.delete('/:ID', (req, res, next) => {
    const id = req.params.ID;
    res.status(200).json({
        messageTomas: "Deleted product!",
        ProductId : id
    })
})



module.exports = router;



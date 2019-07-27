const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        messageTomas: "tomas mali GET request"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        messageTomas: "tomas mali POST request"
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
       // console.log(result)
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

module.exports = router;




const MenuDelGiorno = require('./menudelgiornoModel')

const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')



router.get('/', (req, res, next) => {
    MenuDelGiorno.find({})
        .exec().
        then(doc => {
            console.log(doc)
            res.status(200).json({
                message: doc
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })

})



// POST REQUEST INSERT NEW MENU
router.post('/insert', (req, res, next) => {
    const id = req.body.menuId;
    MenuDelGiorno.find({ }, function (err, docs) {
     {
            const menu_ = new MenuDelGiorno({
                _id: new mongoose.Types.ObjectId(),
                menuId: req.body.menuId,
                primo: { 
                    varieta_1: req.body.primo.varieta_1,
                    varieta_2: req.body.primo.varieta_2,
                    varieta_3: req.body.primo.varieta_3,
                    varieta_4: req.body.primo.varieta_4,
                    varieta_5: req.body.primo.varieta_5
                },
                secondo: {
                    varieta_1: req.body.secondo.varieta_1,
                    varieta_2: req.body.secondo.varieta_2,
                    varieta_3: req.body.secondo.varieta_3,
                    varieta_4: req.body.secondo.varieta_4,
                    varieta_5: req.body.secondo.varieta_5
                },
                contorno: {
                    varieta_1: req.body.contorno.varieta_1,
                    varieta_2: req.body.contorno.varieta_2,
                    varieta_3: req.body.contorno.varieta_3,
                    varieta_4: req.body.contorno.varieta_4,
                    varieta_5: req.body.contorno.varieta_5
                }
            });
            menu_.save()
                .then(result => {
                    console.log("Menu del giorno " + result + " inserted correctly!")
                    res.status(200).json({
                        message: " Menu inserito correttamente!",
                    });
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: err })
                });
        }
    });

})




// DELETE ALL the user 
router.delete('/delete_all', (req, res, next) => {
    MenuDelGiorno.deleteMany({})
        .exec()
        .then(result => {
            res.status(500).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});





















module.exports = router;
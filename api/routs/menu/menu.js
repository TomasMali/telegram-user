const Menu = require('./menuModel')

const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

// First route, get all users
router.get('/', (req, res, next) => {
    Menu.find()
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

// F get one menu
router.get('/find_one/:idM', (req, res, next) => {
    const id = req.params.idM;
    Menu.find({menuId: id})
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


// F get one menu
router.get('/find_max', (req, res, next) => {
    const id = req.params.idM;
    Menu.find().sort({menuId:-1}).limit(1)
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
    Menu.find({ menuId: id }, function (err, docs) {
        if (docs.length) {
            res
                .status(404)
                .json({ message: "menu esiste già!" });
        } else {
            const menu_ = new Menu({
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
                    console.log("Menu " + result + " inserted correctly!")
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



// DELETE  the single user 
router.delete('/delete_one', (req, res, next) => {
    const idM = req.body.menuId;

    Menu.remove({ menuId: idM })
        .exec()
        .then(result => {
            console.log("@@@@@@@@@@@@@@@@@@ " + res)
            res.status(500).json({
                message: "Menu " + idM + " removed correctly!"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});







module.exports = router;
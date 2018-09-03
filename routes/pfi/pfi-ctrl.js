// const mongoose = require('mongoose');
const express = require('express');
// const bodyPaser = require('body-parser');
const ProFormalInvoice = require('./pfi-model');

const router = express.Router();

router

.get('/', (req, res) => {
    ProFormalInvoice.find({}, (err, pfis)=>{
        if(err) throw err;
        res.json(pfis);
    });
})

.get('/:id', (req, res) => {
    ProFormalInvoice.findById({_id: req.params.id}, (err, pfi) => {
        if(err) throw err;
        res.json(pfi);
    });
})

.post('/', (req, res) => {
    const newPfi = ProFormalInvoice({
        quantity: req.body.quantity,
        price: req.body.price,
        itemDetails: req.body.itemDetails,
        pfiNumber: req.body.pfi,
        hsCode: req.body.hsCode
    });

    newPfi.save((err)=>{
        if(err) return res.status(500).send("failed to save");
        else return res.status(200).send("successfully saved");
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const GetInTouch = require('../models/GetInTouch');

// Get Contact Details (Assuming only one)
router.get('/', async (req, res) => {
    try {
        const contact = await GetInTouch.findOne();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create or Update Contact Details
router.post('/', async (req, res) => {
    try {
        let contact = await GetInTouch.findOne();
        if (contact) {
            // Update
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.address = req.body.address;
            contact.mapUrl = req.body.mapUrl;
            const updatedContact = await contact.save();
            return res.json(updatedContact);
        } else {
            // Create
            const newContact = new GetInTouch({
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                mapUrl: req.body.mapUrl
            });
            const savedContact = await newContact.save();
            return res.status(201).json(savedContact);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

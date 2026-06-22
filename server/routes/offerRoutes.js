const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const { upload } = require('../config/cloudinary');

const { getOptimizedUrl } = require('../utils/urlHelper');

// Get all offers
router.get('/', async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new offer
router.post('/', upload.single('image'), async (req, res) => {
    const offer = new Offer({
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        price: req.body.price,
        type: req.body.type,
        imageUrl: getOptimizedUrl(req.file),
        uberLink: req.body.uberLink,
        pickMeLink: req.body.pickMeLink
    });

    try {
        const newOffer = await offer.save();
        res.status(201).json(newOffer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update offer
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        if (req.body.title) offer.title = req.body.title;
        if (req.body.subtitle) offer.subtitle = req.body.subtitle;
        if (req.body.content) offer.content = req.body.content;
        if (req.body.price) offer.price = req.body.price;
        if (req.body.type) offer.type = req.body.type;
        if (req.body.uberLink) offer.uberLink = req.body.uberLink;
        if (req.body.pickMeLink) offer.pickMeLink = req.body.pickMeLink;
        if (req.file) offer.imageUrl = getOptimizedUrl(req.file);

        const updatedOffer = await offer.save();
        res.json(updatedOffer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete offer
router.delete('/:id', async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

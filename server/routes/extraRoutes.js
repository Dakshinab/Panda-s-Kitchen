const express = require('express');
const router = express.Router();
const ExtraItem = require('../models/ExtraItem');
const { upload } = require('../config/cloudinary');
const { getOptimizedUrl } = require('../utils/urlHelper');

router.get('/', async (req, res) => {
    try {
        const extras = await ExtraItem.find().sort({ createdAt: -1 });
        res.json(extras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const extra = new ExtraItem({
        title: req.body.title,
        subtitle: req.body.subtitle,
        price: req.body.price,
        category: req.body.category,
        imageUrl: getOptimizedUrl(req.file),
        uberLink: req.body.uberLink || '',
        pickMeLink: req.body.pickMeLink || ''
    });
    try {
        const newExtra = await extra.save();
        res.status(201).json(newExtra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const extra = await ExtraItem.findById(req.params.id);
        if (!extra) return res.status(404).json({ message: 'Item not found' });
        if (req.body.title) extra.title = req.body.title;
        if (req.body.subtitle) extra.subtitle = req.body.subtitle;
        if (req.body.price) extra.price = req.body.price;
        if (req.body.category) extra.category = req.body.category;
        if (req.body.uberLink !== undefined) extra.uberLink = req.body.uberLink;
        if (req.body.pickMeLink !== undefined) extra.pickMeLink = req.body.pickMeLink;
        if (req.file) extra.imageUrl = getOptimizedUrl(req.file);
        const updatedExtra = await extra.save();
        res.json(updatedExtra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const extra = await ExtraItem.findByIdAndDelete(req.params.id);
        if (!extra) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete all items by category (used for migration)
router.delete('/category/:cat', async (req, res) => {
    try {
        await ExtraItem.deleteMany({ category: req.params.cat });
        res.json({ message: `All ${req.params.cat} items deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');
const { upload } = require('../config/cloudinary');
const { getOptimizedUrl } = require('../utils/urlHelper');

// Get all slides
router.get('/', async (req, res) => {
    try {
        const slides = await HeroSlide.find().sort({ order: 1 });
        res.json(slides);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new slide
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const heroSlide = new HeroSlide({
            imageUrl: getOptimizedUrl(req.file),
            order: req.body.order ? Number(req.body.order) : 0,  // FIX: save order
            uberLink: req.body.uberLink || '',
            pickMeLink: req.body.pickMeLink || ''
        });
        const newSlide = await heroSlide.save();
        res.status(201).json(newSlide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update slide
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const slide = await HeroSlide.findById(req.params.id);
        if (!slide) return res.status(404).json({ message: 'Slide not found' });

        if (req.body.order !== undefined) slide.order = Number(req.body.order);  // FIX: proper number cast
        if (req.file) slide.imageUrl = getOptimizedUrl(req.file);
        if (req.body.uberLink !== undefined) slide.uberLink = req.body.uberLink;     // FIX: save links
        if (req.body.pickMeLink !== undefined) slide.pickMeLink = req.body.pickMeLink; // FIX: save links

        const updatedSlide = await slide.save();
        res.json(updatedSlide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete slide
router.delete('/:id', async (req, res) => {
    try {
        const slide = await HeroSlide.findByIdAndDelete(req.params.id);
        if (!slide) return res.status(404).json({ message: 'Slide not found' });
        res.json({ message: 'Slide deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
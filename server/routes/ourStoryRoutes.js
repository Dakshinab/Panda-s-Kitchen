const express = require('express');
const router = express.Router();
const OurStory = require('../models/OurStory');
const { upload } = require('../config/cloudinary');

const { getOptimizedUrl } = require('../utils/urlHelper');

// Get Our Story content
router.get('/', async (req, res) => {
    try {
        const story = await OurStory.findOne();
        res.json(story || {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update/Create Our Story
router.post('/', upload.single('image'), async (req, res) => {
    try {
        let story = await OurStory.findOne();
        if (story) {
            // Update
            if (req.body.title) story.title = req.body.title;
            if (req.body.subtitle) story.subtitle = req.body.subtitle;
            if (req.body.content) story.content = req.body.content;
            if (req.file) story.imageUrl = getOptimizedUrl(req.file);
            const updatedStory = await story.save();
            return res.json(updatedStory);
        } else {
            // Create
            const newStory = new OurStory({
                title: req.body.title,
                subtitle: req.body.subtitle,
                content: req.body.content,
                imageUrl: getOptimizedUrl(req.file)
            });
            const savedStory = await newStory.save();
            return res.status(201).json(savedStory);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

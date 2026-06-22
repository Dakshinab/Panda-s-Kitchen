const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new feedback
router.post('/', async (req, res) => {
    const feedback = new Feedback({
        customerName: req.body.customerName,
        comment: req.body.comment,
        rating: req.body.rating
    });

    try {
        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update feedback
router.put('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

        if (req.body.customerName) feedback.customerName = req.body.customerName;
        if (req.body.comment) feedback.comment = req.body.comment;
        if (req.body.rating) feedback.rating = req.body.rating;

        const updatedFeedback = await feedback.save();
        res.json(updatedFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete feedback
router.delete('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
        res.json({ message: 'Feedback deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

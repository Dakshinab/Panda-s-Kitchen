const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isDisplayed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);

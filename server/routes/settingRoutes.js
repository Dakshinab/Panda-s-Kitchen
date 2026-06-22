const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Get setting by key
router.get('/:key', async (req, res) => {
    try {
        const setting = await Setting.findOne({ key: req.params.key });
        if (!setting) return res.status(404).json({ message: 'Setting not found' });
        res.json(setting);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upsert setting (Create or Update)
router.post('/', async (req, res) => {
    const { key, value } = req.body;
    try {
        let setting = await Setting.findOne({ key });
        if (setting) {
            setting.value = value;
            await setting.save();
        } else {
            setting = new Setting({ key, value });
            await setting.save();
        }
        res.json(setting);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

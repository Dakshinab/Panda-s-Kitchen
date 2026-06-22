const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../config/cloudinary');
const { getOptimizedUrl } = require('../utils/urlHelper');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const product = new Product({
        title: req.body.title,
        subtitle: req.body.subtitle,
        price: req.body.price,
        originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : null,
        category: req.body.category,
        imageUrl: getOptimizedUrl(req.file),
        uberLink: req.body.uberLink || '',
        pickMeLink: req.body.pickMeLink || '',
        badge: req.body.badge || '',
        badgeColor: req.body.badgeColor || 'red',
        bottomBadge: req.body.bottomBadge || '',
        bottomBadgeColor: req.body.bottomBadgeColor || 'red'
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (req.body.title) product.title = req.body.title;
        if (req.body.subtitle) product.subtitle = req.body.subtitle;
        if (req.body.price) product.price = req.body.price;
        product.originalPrice = req.body.originalPrice ? Number(req.body.originalPrice) : null;
        if (req.body.category) product.category = req.body.category;
        if (req.body.uberLink !== undefined) product.uberLink = req.body.uberLink;
        if (req.body.pickMeLink !== undefined) product.pickMeLink = req.body.pickMeLink;
        if (req.body.badge !== undefined) product.badge = req.body.badge;
        if (req.body.badgeColor !== undefined) product.badgeColor = req.body.badgeColor;
        if (req.body.bottomBadge !== undefined) product.bottomBadge = req.body.bottomBadge;
        if (req.body.bottomBadgeColor !== undefined) product.bottomBadgeColor = req.body.bottomBadgeColor;
        if (req.file) product.imageUrl = getOptimizedUrl(req.file);

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
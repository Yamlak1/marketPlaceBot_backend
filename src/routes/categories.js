const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../Controller/catagories');

// Route to fetch categories
router.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories();
        const formattedCategories = categories.map(category => ({
            category_name: category.catagory_name,
            topic_id: category.topic_id
        }));
        res.json(formattedCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

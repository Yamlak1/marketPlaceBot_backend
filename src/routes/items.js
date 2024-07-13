// routes/items.js
const express = require('express');
const router = express.Router();
const { saveItem } = require('../Controller/Items');
const { createUser } = require('../Controller/user');
const { getItem } = require('../Controller/Items');
const { getItemStatus } = require('../Controller/Items');
const { updateItemStatus } = require('../Controller/Items');
const { checkSelfPurchase } = require('../Controller/Items');


router.post('/saveWithUser', async (req, res) => {
    try {
        const { fullName, email, phone, chatId, termsConditions, productName, picFileId, description, price, pickUpLocation } = req.body;
        let newItemId;
        const newUser = await createUser(null, fullName, email, phone, chatId, termsConditions);

    
        newItemId = await saveItem(newUser.id, productName, picFileId, description, price, pickUpLocation);

        res.json({ itemId: newItemId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/save', async (req, res) => {
    try {
        const { userId, productName, picFileId, description, price, pickUpLocation } = req.body;
        const itemId = await saveItem(userId, productName, picFileId, description, price, pickUpLocation);
        res.json({ itemId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await getItem(itemId);
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:itemId/status', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const status = await getItemStatus(itemId);
        res.json({ status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:itemId/updateStatus', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        await updateItemStatus(itemId);
        // Respond with no content (204) as the API does not return anything
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/checkSelfPurchase/:chatId/:itemId', async (req, res) => { // Add :itemId parameter
    try {
        const { chatId, itemId } = req.params; // Get chatId and itemId from params
        const isSelfPurchase = await checkSelfPurchase(chatId, itemId); // Pass chatId and itemId to the controller function
        res.json({ isSelfPurchase });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;

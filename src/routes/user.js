const { Router } = require('express');
const { registerUser } = require('../Controller/user');
const { getUserByChatId , createUser} = require('../Controller/user');

const router = Router();
router.get('/:chat_id', async (req, res) => {
    try {
        const chatId = req.params.chat_id;
        const user = await getUserByChatId(chatId);
        if (user) {
            res.json({ user_id: user.id });
        } else {
            res.send(false);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { id, fullName, email, phone, chatId, termsConditions } = req.body;
        const newUser = await createUser(id, fullName, email, phone, chatId, termsConditions);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/registerUser', async (req, res) => {
    try {
        const { fullName, email, phone, chatId, termsConditions } = req.body;
        const userId = await registerUser(fullName, email, phone, chatId, termsConditions);
        res.status(201).json({ userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;

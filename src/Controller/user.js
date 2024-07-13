const {User} = require('../models/Users');

async function createUser(id, fullName, email, phone, chatId, termsConditions=true) {
    try {
        return await User.create({
            id: id,
            full_name: fullName,
            email: email,
            phone: phone,
            chat_id: chatId,
            terms_conditions: termsConditions
        });
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}




// Function to search for a user by Telegram ID
async function getUserByChatId(chatId) {
    try {
        const user = await User.findOne({
            where: { chat_id: chatId }
        });
        console.log('User found:', user ? user.toJSON() : 'Not found');
        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

// Function to get all users from the Users table
async function getAllUsers() {
    try {
        const users = await User.findAll();
        console.log('All Users:', users.map(user => user.toJSON()));
        return users;
    } catch (error) {
        console.error('Error getting all users:', error);
        throw error;
    }
}

// Function to delete a user by ID from the Users table
async function deleteUserById(userId) {
    try {
        const deletedUserCount = await User.destroy({
            where: { id: userId },
        });

        if (deletedUserCount > 0) {
            console.log(`User with ID ${userId} deleted successfully.`);
            return true;
        } else {
            console.log(`User with ID ${userId} not found.`);
            return false;
        }
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    }
}

async function registerUser(fullName, email, phone, chatId, termsConditions = true) {
    try {
        const newUser = await User.create({
            full_name: fullName,
            email: email,
            phone: phone,
            chat_id: chatId,
            terms_conditions: termsConditions
        });
        return newUser.id; // Return the ID of the newly created user
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
}

module.exports = { createUser, getUserByChatId, getAllUsers, deleteUserById, registerUser };
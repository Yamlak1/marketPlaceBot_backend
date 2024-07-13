//const { get } = require('../app');
const { Category } = require('../models/catagories');

async function createCategory(id, topicId, name) {
    try {
        const newCategory = await Category.create({
            id: id,
            topic_id: topicId,
           catagory_name: name
        });
        return newCategory;
    } catch (error) {
        throw new Error('Error creating category: ' + error.message);
    }
}

async function getAllCategories() {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        throw new Error('Error getting all categories: ' + error.message);
    }
}

// Function to delete all entries from the Categories table
async function deleteAllCategories() {
    try {
        await Category.destroy({
            where: {},
            truncate: true 
        });
        console.log("All entries from the Categories table have been deleted successfully.");
    } catch (error) {
        throw new Error('Error deleting all categories: ' + error.message);
    }
}

module.exports = { createCategory, getAllCategories, deleteAllCategories };

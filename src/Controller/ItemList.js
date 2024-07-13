const {ItemList} = require('../models/ItemList');

async function createItemList(productName, picFileId, description, price, pickUpLocation, userId) {
    try {
        const itemList = await ItemList.create({
            product_name: productName,
            pic_file_id: picFileId,
            description: description,
            price: price,
            pickUp_location: pickUpLocation,
            UserId: userId 
        });
        return itemList;
    } catch (error) {
        throw new Error('Error creating item list: ' + error.message);
    }
}

module.exports = { createItemList };

const { ItemList } = require("../models/ItemList");
const {User}=require("../models/Users");


async function saveItem(userId, productName, picFileId, description, price, pickUpLocation) {

    try {
        console.log(pickUpLocation);
        const item = await ItemList.create({
                product_name: productName,
            pic_file_id: picFileId,
            description: description,
            price: price,
            pickUp_location: pickUpLocation,
            UserId: userId
        });

        return item.id;
    } catch (error) {
        throw new Error('Error saving item: ' + error.message);
    }
}
async function getItem(itemId) {
    try {
        const item= await ItemList.findByPk(itemId, 
            { where: {status: true },
            include:[User],
        });

        if (!item) {
            throw new Error('Item not found');
        }
         const fetchedItem= {id: item.id, product_name: item.product_name, UserId:item.UserId,sellerChatId:item.User.chat_id, productName: item.productName, pic_file_id: item.pic_file_id, description: item.description, price: item.price, pickUp_location: item.pickUp_location}
        return fetchedItem;
    } catch (error) {
        throw new Error('Error getting item: ' + error.message);
    }
}

async function getItemStatus(itemId) {
    try {
        const item = await ItemList.findByPk(itemId);
        if (item) {
            return item.status;
        } else {
            throw new Error("Item not found");
        }
    } catch (error) {
        throw new Error('Error retrieving item status: ' + error.message);
    }
}

async function updateItemStatus(itemId) {
    try {
        const item = await ItemList.findByPk(itemId);
        if (item) {
            await item.update({ status: false });
        } else {
            throw new Error("Item not found");
        }
    } catch (error) {
        throw new Error('Error updating item status: ' + error.message);
    }
}


async function checkSelfPurchase(chatId, itemId) {
    try {
        const user = await User.findOne({
            where: { chat_id: chatId }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const item = await ItemList.findByPk(itemId);

        if (!item) {
            throw new Error("Item not found");
        }
        const isSelfPurchase = item.UserId === user.id;

        return isSelfPurchase;
    } catch (error) {
        throw new Error('Error checking self purchase: ' + error.message);
    }
}



module.exports = {saveItem, getItem, getItemStatus,updateItemStatus, checkSelfPurchase };

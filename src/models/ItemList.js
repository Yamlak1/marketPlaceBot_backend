const { sequelize } = require('../config/db');
const {DataTypes} = require("sequelize");
const { User } = require('./Users');

const ItemList = sequelize.define('Item_lists', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    pic_file_id: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    price: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    pickUp_location: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    
}, { 
    tableName: "Item_lists" 
});
User.hasMany(ItemList);
ItemList.belongsTo(User);

module.exports = { ItemList };
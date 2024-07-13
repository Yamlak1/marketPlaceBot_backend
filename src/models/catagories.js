const { sequelize } = require('../config/db');
const {DataTypes} = require("sequelize");


const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    catagory_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, { tableName: "Categories" });


module.exports = { Category };
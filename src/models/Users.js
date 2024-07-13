const { sequelize } = require('../config/db');
const {DataTypes} = require("sequelize");


const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chat_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        terms_conditions: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    {tableName: "Users"}
)

module.exports = { User };
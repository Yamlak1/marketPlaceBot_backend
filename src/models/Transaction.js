const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");
const { ItemList } = require("./ItemList");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ItemListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyer_chatID: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    seller_chatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_amount: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    transaction_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "successful", "failed"]],
      },
    },
    gateway_transaction_ID: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    tableName: "Transactions",
    timestamps: false,
  }
);

ItemList.hasMany(Transaction);
Transaction.belongsTo(ItemList);
module.exports = { Transaction };

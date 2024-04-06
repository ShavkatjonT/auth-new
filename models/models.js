const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");
const { Sequelize } = require("../db");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    status_main: { type: DataTypes.STRING, defaultValue: "active" },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
});

const Product = sequelize.define("products", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    status_main: { type: DataTypes.STRING, defaultValue: "active" },
    category_id: {
        type: Sequelize.STRING
    },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
});

const Category = sequelize.define("category", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    status_main: { type: DataTypes.STRING, defaultValue: "active" },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
});

module.exports = {
    User,
    Product,
    Category
}
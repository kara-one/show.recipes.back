const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Recipes = sequelize.define('recipes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING, defaultValue: '' },
    imageUrl: { type: DataTypes.TEXT, defaultValue: '' },
    info: { type: DataTypes.TEXT, defaultValue: '' },
});

module.exports = { Recipes };

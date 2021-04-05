const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Recipes = sequelize.define('recipes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING, defaultValue: '' },
    imageUrl: { type: DataTypes.STRING, defaultValue: '' },
    info: { type: DataTypes.STRING, defaultValue: '' },
});

module.exports = { Recipes };

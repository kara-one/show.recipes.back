const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
    {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
            },
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
    },
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    // {
    //     dialect: 'postgres',
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT,
    // },
);

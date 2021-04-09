const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandlerMiddleware');
const fileUpload = require('express-fileupload');

const sequelize = require('./db');
const models = require('./models/models');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(fileUpload({}));

app.use(routes);

app.use(errorHandler);

const init = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        
        app.listen(PORT, () =>
            console.log('\x1b[32m', `Server Up! pp listening on port ${PORT}!`, '\x1b[0m',)
        );
    } catch (e) {
        console.error(e);
    }
};

init();

const ApiError = require('../error/ApiError');
const { Recipes } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
var faker = require('faker');

const IMAGE_DIR = path.resolve(__dirname, '..', 'uploads');
const getExt = (fullname) => fullname.split('.').pop().toLowerCase();

/** PUBLIC */
class recipeController {
    async getAll(req, res, next) {
        let { limit, page } = req.query;

        page = page || 1;
        limit = limit || 6;
        let offset = page * limit - limit;

        try {
            const data = await Recipes.findAndCountAll({ limit, offset });

            return res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const data = await Recipes.findOne({ where: { id } });
            if (!data) {
                const err = ApiError.badRequest('User is not found!');
                return next(err);
            }

            return res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async create(req, res, next) {
        _changeRow(req, res, next, 'create');
    }
    async edit(req, res, next) {
        _changeRow(req, res, next, 'edit');
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const oldData = await Recipes.findOne({ where: { id } });
            if (!oldData) {
                const err = ApiError.badRequest('User is not found!');
                return next(err);
            }

            const data = await Recipes.destroy({ where: { id } });

            /** Success */
            return res.json({
                message: `Yo! The Recipe has been delete!`,
                data,
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async fakeSeed(req, res, next) {
        try {
            const { q } = req.query;
            if (!q) q = 20;

            await Recipes.destroy({ truncate: true, cascade: false });

            for (let i = 1; i <= q; i++) {
                const row = {
                    id: i,
                    name: i + ' ' + faker.lorem.words(),
                    price: faker.datatype.number(),
                    image: '',
                    imageUrl: faker.image.imageUrl(),
                    info: faker.lorem.paragraph(),
                };
                await Recipes.create(row);
            }

            return res.json({ message: 'Seeding ok' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new recipeController();

/** PRIVATE */
async function _changeRow(req, res, next, method) {
    try {
        const { name, price, info, imageUrl } = req.body;
        const files = req.files;
        const newData = {};

        if (name) newData.name = name;
        if (price) newData.price = price;
        if (imageUrl) newData.imageUrl = imageUrl;
        if (info) newData.info = info;

        /** Upload file */
        if (files && files.image && files.image.name) {
            /** Check extension */
            const leaveExt = ['jpg', 'jpeg', 'png', 'gif'];
            const ext = getExt(files.image.name);
            if (!leaveExt.includes(ext)) {
                const err = ApiError.badRequest('Forbidden kind of file!');
                return next(err);
            }

            /** Upload file */
            newData.image = uuid.v4() + '.' + ext;
            files.image.mv(path.resolve(IMAGE_DIR, newData.image));
        }

        /** Select method */
        let data = null;
        if (method === 'create') {
            data = await Recipes.create({
                ...newData,
            });
        }
        if (method === 'edit') {
            const { id } = req.params;
            const oldData = await Recipes.findOne({ where: { id } });
            if (!oldData) {
                const err = ApiError.badRequest('User is not found!');
                return next(err);
            }

            data = await Recipes.update(
                {
                    ...oldData,
                    ...newData,
                },
                {
                    where: { id: id },
                },
            );
        }

        /** Valid method */
        if (data === null) {
            const err = ApiError.badRequest('Unknown method!');
            return next(err);
        }

        /** Success */
        return res.json({
            message: `Yo! The Recipe has been ${method}!`,
            data,
        });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

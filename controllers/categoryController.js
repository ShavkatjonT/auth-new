const ApiError = require("../error/ApiError");
const { User, Product, Category } = require("../models/models");
const validateFun = require('./validateFun')

class CategoryControl {
    async categoryAdd(req, res, next) {
        try {
            const { name, description, status, } = req.body;

            if (!name || !description || !status) {
                return next(
                    ApiError.badRequest('Malumotlar to\'liq kirtilmadi')
                );
            };

            const category = Category.create({
                name,
                description,
                status
            });

        } catch (error) {
            console.log(10, error.stack);
            return next(ApiError.badRequest(error));
        }
    }
    async categoryDelete(req, res, next) {
        try {
            const { id } = req.params;
            if (!validateFun.isValidUUID(id)) {
                return next(ApiError.badRequest("The data was entered incorrectly"));
            }
            const category = await Category.findOne({
                where: {
                    id,
                    status_main: 'active'
                }
            });

            if (!category) {
                return next(
                    ApiError.badRequest('Malumotlar topilmadi')
                );
            };
            category.status_main = 'inactive'
            await category.save();

            return res.send(`${category.name} katego'rya o'chirildi`)
        } catch (error) {
            console.log(10, error.stack);
            return next(ApiError.badRequest(error));
        }



    }
    async categoryPut(req, res, next) {

        try {
            const { id } = req.params;
            const { name, description, status, } = req.body;
            if (!validateFun.isValidUUID(id)) {
                return next(ApiError.badRequest("The data was entered incorrectly"));
            }
            const category = await Category.findOne({
                where: {
                    id,
                    status_main: 'active'
                }
            });
            if (!category) {
                return next(
                    ApiError.badRequest('Malumotlar topilmadi')
                );
            };

            if (name) category.name = name;
            if (description) category.description = description;
            if (status) category.status = status;
            await category.save();
            return res.json(category);

        } catch (error) {
            console.log(10, error.stack);
            return next(ApiError.badRequest(error));
        }
    }
    async categoryGetList(req, res, next) {
        try {
            const category = await Category.findAll({
                where: {
                    status_main: 'active'
                }
            });
            const resData = category.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    description: el.description,
                    status: el.status
                }
            }).fill((el) => el && el);

            return res.json(resData)

        } catch (error) {
            console.log(10, error.stack);
            return next(ApiError.badRequest(error));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!validateFun.isValidUUID(id)) {
                return next(ApiError.badRequest("The data was entered incorrectly"));
            }

            const category = await Category.findOne({
                where: {
                    status_main: "active",
                    id
                }
            })

            if (!category) {
                return next(
                    ApiError.badRequest('Malumotlar toplimadi')
                )
            };

            return res.json(category);
        } catch (error) {

        }
    }
}
module.exports = new CategoryControl();


const ApiError = require("../error/ApiError");
const { User, Product, Category } = require("../models/models");
import validateFun from "./validateFun";

class CategoryControl {
    async add(req, res, next) {
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
    async delete(req, res, next) {
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

    }
    async put(req, res, next) {

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
    }


}

module.exports = new CategoryControl();

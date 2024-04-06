const ApiError = require("../error/ApiError");
const { User, Product, Category } = require("../models/models");
const validateFun = require("./validateFun");


class ProductControl {
    async add(req, res, next) {
        try {
            const { name, description, status, price, category_id } = req.body;

            if (!name || !description || !status || !price || !category_id) {
                return next(
                    ApiError.badRequest('Malumotlar to\'liq emas')
                )
            }

            if (!validateFun.isValidUUID(category_id)) {
                return next(
                    ApiError.badRequest('category_idni qiymati hato kiritildi.')
                )
            };

            const category = await Category.findOne({
                where: {
                    id: category_id,
                    status_main: 'active'
                }
            });

            if (!category) {
                return next(
                    ApiError.badRequest('category topilmaidi')
                )
            };

            const product = await Product.create({
                name, description, status, price, category_id
            });

            return res.json(product)

        } catch (error) {
            console.log(10, error.stack);
            return next(ApiError.badRequest(error));
        }
    }
    async productDelete(req, res, next) {
        try {

            const { id } = req.params;
            if (!validateFun.isValidUUID(id)) {
                return next(ApiError.badRequest("The data was entered incorrectly"));
            }
            const product = await Product.findOne({
                where: {
                    id,
                    status_main: 'active'
                }
            });

            if (!product) {
                return next(
                    ApiError.badRequest('Malumotlar topilmadi')
                );
            };
            product.status_main = 'inactive'
            await product.save();

            return res.send(`${product.name} product o'chirildi`)

        } catch (error) {
            console.log(52, error.stack);
            return next(ApiError.badRequest(error));
        }
    }
    async put(req, res, next) {

        try {
            const { id } = req.params;
            const { name, description, status, price, category_id } = req.body;
            if (!validateFun.isValidUUID(id)) {
                return next(ApiError.badRequest("The data was entered incorrectly"));
            }
            const product = await Product.findOne({
                where: {
                    id,
                    status_main: 'active'
                }
            });
            if (!product) {
                return next(
                    ApiError.badRequest('Malumotlar topilmadi')
                );
            };

            if (category_id && validateFun.isValidUUID(category_id)) {
                product.category_id = category_id
            } else if (category_id && !validateFun.isValidUUID(category_id)) {
                return next(
                    ApiError.badRequest('category_idni qiymati xato')
                )
            }

            if (name) product.name = name;
            if (description) product.description = description;
            if (status) product.status = status;
            if (price) product.price = price;
            await product.save();
            return res.json(product);

        } catch (error) {
            console.log(10, error.stack);
            return next(ApiError.badRequest(error));
        }
    }
    async getList(req, res, next) {
        try {
            const Product = await Product.findAll({
                where: {
                    status_main: 'active'
                }
            });
            const resData = Product.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    description: el.description,
                    status: el.status,
                    price: el.price,
                    category_id: el.category_id
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

            const product = await Product.findOne({
                where: {
                    status_main: "active",
                    id
                }
            })

            if (!product) {
                return next(
                    ApiError.badRequest('Malumotlar toplimadi')
                )
            };

            return res.json(product);
        } catch (error) {

        }
    }

}

module.exports = new ProductControl();

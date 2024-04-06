const ApiError = require("../error/ApiError");
const { User, Product } = require("../models/models");


class ProductControl {
    async add(req, res, next) {
        try {
            const { name, description, status, price, category_id } = req.body;

            if(!name || !description|| !status || !price){
                
            }


        } catch (error) {
            console.log(10, error.stack);
            return next(ApiError.badRequest(error));
        }
    }
}

module.exports = new ProductControl();

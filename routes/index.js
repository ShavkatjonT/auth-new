const Router = require("express");
const router = new Router();
const auth = require('./authRouter');
const category = require('./category');
const categoryPrivate = require('./categoryPrivate');
const product = require('./product');
const productPrivate = require('./productPrivate');

router.use("/auth", auth);
router.use("/category", category);
router.use("/category-private", categoryPrivate);
router.use("/product-private", productPrivate);


module.exports = router;

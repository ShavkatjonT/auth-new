const Router = require("express");
const router = new Router();
const auth = require('./authRouter');
const category = require('./category');
const categoryPrivate = require('./categoryPrivate');

router.use("/auth",  auth);
router.use("/category",  category);
router.use("/category-private",  categoryPrivate);


module.exports = router;

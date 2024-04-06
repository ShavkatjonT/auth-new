const Router = require("express");
const router = new Router();
const { add, productDelete, put, getList, getOne } = require("../controllers/productController");

router.post("/add", add);
router.delete("/delete/:id", productDelete);
router.put("/put/:id", put);
router.get("/get-list", getList);
router.get("/get/:id", getOne);

module.exports = router;

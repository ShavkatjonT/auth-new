const Router = require("express");
const router = new Router();
const { add, productDelete, put, getList, getOne } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, add);
router.delete("/delete/:id", authMiddleware, productDelete);
router.put("/put/:id", authMiddleware, put);
router.get("/get-list", authMiddleware, getList);
router.get("/get/:id", authMiddleware, getOne);

module.exports = router;

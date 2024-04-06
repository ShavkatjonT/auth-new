const Router = require("express");
const router = new Router();
const { categoryAdd, categoryDelete, categoryGetList, categoryPut, getOne } = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, categoryAdd);
router.delete("/delete/:id", authMiddleware, categoryDelete);
router.put("/put/:id", authMiddleware, categoryPut);
router.get("/get-list", authMiddleware, categoryGetList);
router.get("/get/:id", authMiddleware, getOne);


module.exports = router;

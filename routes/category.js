const Router = require("express");
const router = new Router();
const { categoryAdd, categoryDelete, categoryGetList, categoryPut, getOne } = require("../controllers/categoryController");

router.post("/add", categoryAdd);
router.delete("/delete/:id", categoryDelete);
router.put("/put/:id", categoryPut);
router.get("/get-list", categoryGetList);
router.get("/get/:id", getOne);

module.exports = router;

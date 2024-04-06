const Router = require("express");
const router = new Router();
const { categoryAdd, categoryDelete, categoryGetList, categoryPut } = require("../controllers/categoryController");

router.post("/add", categoryAdd);
router.delete("/delete/:id", categoryDelete);
router.put("/put/:id", categoryPut);
router.get("/get-list", categoryGetList);


module.exports = router;

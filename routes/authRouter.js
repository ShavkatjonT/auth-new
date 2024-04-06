const Router = require("express");
const router = new Router();
const { registrationAdmin, registrationTeacher } = require('../controllers/authController')


router.post("/registration-admin", registrationAdmin);
router.post("/registration-teacher", registrationTeacher);




module.exports = router;

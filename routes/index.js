const Router = require("express");
const router = new Router();
const auth = require('./authRouter')

router.use("/auth", auth);


module.exports = router;

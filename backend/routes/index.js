const expess = require("express");
const router = expess.Router();
const userRoute = require("./user");
router.use("/user", userRoute)
module.exports = router
const { Router } = require("express");
const checkToken = require("../../libs/checkToken");

const router = Router();

router.use("/login", require("./auth"));
router.use("/registration", require("./reg"));
router.use("/profile", checkToken, require("./profile"));
router.use("/users", checkToken, require("./users"));

module.exports = router;

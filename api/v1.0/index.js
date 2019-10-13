const { Router } = require("express");
const checkToken = require("../../libs/checkToken");
const { refresh } = require("../../controllers/auth");

const router = Router();

router.post("/refresh-token", refresh);

router.use("/login", require("./auth"));
router.use("/registration", require("./reg"));
router.use("/profile", checkToken, require("./profile"));
router.use("/users", checkToken, require("./users"));
router.use("/news", checkToken, require("./news"));

module.exports = router;

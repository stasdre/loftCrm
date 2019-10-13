const { Router } = require("express");

const router = Router();

router.use("/", require("./users"));
router.use("/login", require("./auth"));
router.use("/registration", require("./reg"));
router.use("/profile", require("./profile"));

module.exports = router;

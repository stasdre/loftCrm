const { Router } = require("express");

const router = Router();

router.use("/", require("./users"));
router.use("/login", require("./auth"));
router.use("/registration", require("./reg"));

module.exports = router;

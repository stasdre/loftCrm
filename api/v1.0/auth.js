const { Router } = require("express");
const controller = require("../../controllers/auth");
const checkToken = require("../../libs/checkToken");

const router = Router();

router.post("/refresh-token", checkToken, controller.refresh);
router.post("/login", controller.login);
router.post("/registration", controller.reg);

module.exports = router;

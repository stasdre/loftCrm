const { Router } = require("express");
const checkToken = require("../../../libs/checkToken");
const controller = require("../../../controllers/profile");

const router = Router();

router.get("/", checkToken, controller.check);

module.exports = router;

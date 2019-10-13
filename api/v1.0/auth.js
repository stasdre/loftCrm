const { Router } = require("express");
const controller = require("../../controllers/auth");

const router = Router();

router.post("/", controller.login);

module.exports = router;

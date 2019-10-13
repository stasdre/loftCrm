const { Router } = require("express");
const controller = require("../../controllers/users");

const router = Router();

router.post("/", controller.login);

module.exports = router;

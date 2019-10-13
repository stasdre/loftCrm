const { Router } = require("express");
const controller = require("../../../controllers/profile");

const router = Router();

router.get("/", controller.check);

module.exports = router;

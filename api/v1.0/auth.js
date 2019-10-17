const { Router } = require("express");
const controller = require("../../controllers/auth");
const checkToken = require("../../middleware/checkToken");
const schema = require("../../schemas/reg");
const validation = require("../../middleware/validation");

const router = Router();

router.post("/refresh-token", checkToken, controller.refresh);
router.post("/login", controller.login);
router.post("/registration", validation(schema), controller.reg);

module.exports = router;

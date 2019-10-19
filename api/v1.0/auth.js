const { Router } = require("express");
const controller = require("../../controllers/auth");
const schema = require("../../schemas/reg");
const validation = require("../../middleware/validation");

const router = Router();

router.post("/refresh-token", controller.refresh);
router.post("/login", controller.login);
router.post("/registration", validation(schema), controller.reg);

module.exports = router;

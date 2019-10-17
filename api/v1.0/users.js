const { Router } = require("express");
const controller = require("../../controllers/users");

const router = Router();

router.get("/", controller.getAll);
router.delete("/:id", controller.remove);
router.patch("/:id/permission", controller.permissionsUpdate);

module.exports = router;

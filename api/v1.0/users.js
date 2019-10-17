const { Router } = require("express");
const controller = require("../../controllers/users");
const schema = require("../../schemas/permisions");
const validation = require("../../middleware/validation");

const router = Router();

router.get("/", controller.getAll);
router.delete("/:id", controller.remove);
router.patch(
  "/:id/permission",
  validation(schema),
  controller.permissionsUpdate
);

module.exports = router;

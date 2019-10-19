const { Router } = require("express");
const controller = require("../../controllers/users");
const schema = require("../../schemas/permisions");
const validation = require("../../middleware/validation");
const permisions = require("../../middleware/checkPermisions");

const router = Router();

router.get("/", permisions("settings", "R"), controller.getAll);
router.delete("/:id", permisions("settings", "D"), controller.remove);
router.patch(
  "/:id/permission",
  permisions("settings", "U"),
  validation(schema),
  controller.permissionsUpdate
);

module.exports = router;

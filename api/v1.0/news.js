const { Router } = require("express");
const controller = require("../../controllers/news");
const schema = require("../../schemas/news");
const validation = require("../../middleware/validation");
const permisions = require("../../middleware/checkPermisions");

const router = Router();

router.get("/", permisions("news", "R"), controller.getAll);
router.post(
  "/",
  permisions("news", "C"),
  validation(schema),
  controller.create
);
router.delete("/:id", permisions("news", "D"), controller.remove);
router.patch(
  "/:id",
  permisions("news", "U"),
  validation(schema),
  controller.update
);

module.exports = router;

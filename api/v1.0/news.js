const { Router } = require("express");
const controller = require("../../controllers/news");
const schema = require("../../schemas/news");
const validation = require("../../middleware/validation");

const router = Router();

router.get("/", controller.getAll);
router.post("/", validation(schema), controller.create);
router.delete("/:id", controller.remove);
router.patch("/:id", validation(schema), controller.update);

module.exports = router;

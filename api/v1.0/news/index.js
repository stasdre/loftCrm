const { Router } = require("express");
const controller = require("../../../controllers/news");

const router = Router();

router.get("/", controller.getAll);
router.post("/", controller.create);
router.delete("/:id", controller.remove);
router.patch("/:id", controller.update);

module.exports = router;

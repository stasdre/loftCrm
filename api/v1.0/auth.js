const { Router } = require("express");

const router = Router();

router.post("/", async (req, res) => {
  res.json({ message: "Login!!" });
});

module.exports = router;

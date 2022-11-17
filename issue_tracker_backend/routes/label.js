const express = require("express");
const router = express.Router();

const labelController = require("../controllers/label_controller");

router.post("/add", labelController.add);
router.get("/details/:id", labelController.details);

module.exports = router;
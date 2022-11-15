const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project_controller");

router.post("/create", projectController.create);
router.get("/details/:id", projectController.details);

module.exports = router;

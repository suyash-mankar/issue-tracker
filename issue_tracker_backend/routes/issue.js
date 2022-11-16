const express = require("express");
const router = express.Router();

const issueController = require("../controllers/issue_controller");

router.post("/create", issueController.create);

module.exports = router;
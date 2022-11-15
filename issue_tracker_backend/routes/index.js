const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/home", homeController.home);

router.use('/project', require('./project'));


module.exports = router;

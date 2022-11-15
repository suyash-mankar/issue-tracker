const Project = require("../models/Project");

module.exports.home = function (req, res) {
  Project.find({}, function (err, projects) {
    if (err) {
      console.log("error in finding projects from db");
      return;
    }
    return res.status(200).json({ data: projects, status: "success" });
  });
};

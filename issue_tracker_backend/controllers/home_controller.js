const Project = require("../models/Project");

module.exports.home = function (req, res) {
  // find all the projects
  Project.find({}, function (err, projects) {
    if (err) {
      console.log("error in finding projects from db");
      return;
    }
    // send the projects data in response
    return res.status(200).json({ data: projects, status: "success" });
  });
};

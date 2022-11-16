const Project = require("../models/Project");

module.exports.create = function (req, res) {
  const { name, description, author } = req.body;

  Project.create(
    {
      name,
      description,
      author,
    },
    function (err, newProject) {
      if (err) {
        console.log("error in creating new project", err);
        return;
      }
      console.log("******", newProject);
      return res.sendStatus(200);
    }
  );
};

module.exports.details = async function (req, res) {

  try {
    let project = await Project.findOne({ _id: req.params.id });

    if (project) {
      project = await project.populate("issues");
      return res.json({ data: project });
    }
  } catch (err) {
    if (err) {
      console.log("error in finding project details in db", err);
      return;
    }
  }
};

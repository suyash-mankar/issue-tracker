const Issue = require("../models/Issue");
const Project = require("../models/Project");

module.exports.create = async function (req, res) {
  const { title, description, labels, author, project } = req.body;

  let projectInDb = await Project.findById(project);

  if (projectInDb) {
    let issue = await Issue.create({
      title,
      description,
      labels,
      author,
      project,
    });

    projectInDb.issues.push(issue);
    projectInDb.save();

    console.log("******", issue);
    return res.sendStatus(200);
  }
};

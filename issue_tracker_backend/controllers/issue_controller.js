const Issue = require("../models/Issue");
const Project = require("../models/Project");

module.exports.create = async function (req, res) {
  const { title, description, labels, author, project } = req.body;
  // find the project of which we are creating an issue in the database
  let projectInDb = await Project.findById(project);

  if (projectInDb) {
    // Create a document in Issue Collection in database
    let issue = await Issue.create({
      title,
      description,
      labels,
      author,
      project,
    });

    // Push the issue in project
    projectInDb.issues.push(issue);
    projectInDb.save();

    console.log("******", issue);
    // send status code 200 (success)
    return res.sendStatus(200);
  }
};

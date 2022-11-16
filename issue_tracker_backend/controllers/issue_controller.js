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

// module.exports.getDetails = function (req, res) {
//   Project.find({}, function (err, project) {
//     if (err) {
//       console.log("error in finding project details in db");
//       return;
//     }
//     return res.json({ data: project });
//   });
// };

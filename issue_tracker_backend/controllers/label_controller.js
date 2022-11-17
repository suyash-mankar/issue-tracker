const Label = require("../models/Label");
const Project = require("../models/Project");
const Issue = require("../models/Issue");

module.exports.add = async function (req, res) {
  const { labels, issue, project } = req.body;

  let label = await Label.create({
    labels,
    issue,
    project,
  });

  console.log("******", label);

  return res.sendStatus(200);
};

module.exports.details = async function (req, res) {
  let label = await Label.find({ project: req.params.id }).populate("issue");

  if (label) {
    return res.status(200).json({ data: label });
  }
};

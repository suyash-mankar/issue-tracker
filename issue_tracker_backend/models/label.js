const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    labels: {
      type: Array,
      required: true,
    },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Label = mongoose.model("Label", labelSchema);

module.exports = Label;

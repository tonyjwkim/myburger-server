const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contentSchema = require("./Content");

const folderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderName: {
      type: String,
      required: true,
    },
    content: [contentSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Folder", folderSchema);

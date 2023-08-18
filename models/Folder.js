const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const folderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  folderName: {
    type: String,
    required: true,
    default: "My Folder",
  },
  textContent: [contentSchema],
});

module.exports = mongoose.model("Folder", folderSchema);

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: false,
      default: "file_1694503092178.jpg",
    },
    author:{
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
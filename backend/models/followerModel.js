const mongoose = require("mongoose");

const FollowerSchema = new mongoose.Schema(
  {
    following: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: String,
      }
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Follower", FollowerSchema);
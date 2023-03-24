const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // _id is ObjectId
      required: true,
      ref: "User", // Add reference to know which model does this ObjectId pertain to
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

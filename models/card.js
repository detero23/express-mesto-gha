const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
});
const likesSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
});

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  likes: [
    {
      type: mongoose.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);

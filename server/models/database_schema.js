// this file will hold and export the schema for our user Data base
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.URI;

mongoose
  .connect(uri, {
    dbName: "test",
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const Schema = mongoose.Schema;

const login = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Login = mongoose.model("login", login);

// update to be profile schema
const userSchema = new Schema({
  displayName: { type: String, required: true },
  // this links this user to the log in credentials by the id
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Login" },
  skillVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "SkillVideo" }],
  points: { type: Number },
  savedSkills: { type: Array },
});
const User = mongoose.model("user", userSchema);

const skillsVideoSchema = new Schema({
  subject: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const SkillVideo = mongoose.model("skillVideo", skillsVideoSchema);

module.exports = { Login, User, SkillVideo };

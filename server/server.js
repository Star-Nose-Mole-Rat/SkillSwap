const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;

const userController = require("./controllers/userController.js");
const profileController = require("./controllers/profileController.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

app.get("/signup", (req, res) => {
  return res.status(200).redirect("/signup");
});

// when making a post request to sign up on sucess will respond with 200
app.post("/signup", userController.addUser, (req, res) => {
  console.log("new user added");
  return res.sendStatus(200);
});
// from here will can do a port request or a
// app.use('/userprofile', profileRouter);
// app.use('/search', searchRouter);
// respond to a post request to /addSkill
// these are the pofile requests:
app.post("/addSkill:user", profileController.addSkill);
app.get("/profile:user", profileController.profile);

//test search query
app.get("/search", (req, res) => {
  console.log("query", req.query.searchword);
  return res.status(200).send(["banana", "apple", "pineapple"]);
});

//NOTE: catch all route handler for any request to an unknown route
app.use((req, res) => {
  this.response.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };

  //trigger it to run
  defaultErr.log = err.log;
  defaultErr.message = err.message;
  const errorObj = Object.assign({}, defaultErr);
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

// module.exports = app;

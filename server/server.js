const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const userController = require("./controllers/userController.js");
const cookieController = require("./controllers/cookieController.js");
const profileController = require("./controllers/profileController.js");
const searchController = require("./controllers/searchController.js");

const PORT = 3000;

/* Automatically parse urlencoded body content and form data from
incoming requests and place it in req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Handle request for static files */
app.use(express.static(path.resolve(__dirname, "../dist")));

// root (homepage)
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// login
app.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    // On successful login, sends userId back to frontend
    return res.status(200).json({ userID: res.locals.userID, status: 200 });
  }
);

// signup
app.post(
  "/signup",
  userController.addUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    // On successful signup, send user/profile IDs back to frontend
    return res.status(200).json({
      userID: res.locals.userID,
      profileID: res.locals.profileID,
    });
  }
);

// these are the pofile requests:
// adds a video skill to the user profile
app.post("/addSkill", profileController.addSkill);
// serves the user profile with video links
app.get("/profile/:userId", profileController.profile);
// checks to see if user has enough points and if so, decrements the points
app.patch("/profile", profileController.usePoints);

app.get("/profile", (req, res) => {
  return res.status(200);
});

// frontend test search query
app.get("/searchKeyword", searchController.searchVideo, (req, res) => {
  console.log("query", req.query.searchword);
  return res.status(200).send(res.locals.videoList);
});

// frontend test for addvideo
// app.get("/addvideo", (req, res) => {
//   console.log("query.username", req.query.username);
//   console.log("query.videouri", req.query.videouri);
//   return res.status(200).send("addvideo OK");
// });

//NOTE: catch all route handler for any request to an unknown route
app.use((req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../dist/index.html"), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occured");
      }
    });
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
  console.log("in global error handler");
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

// module.exports = app;

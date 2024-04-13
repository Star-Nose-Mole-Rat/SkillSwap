// in this file we will validate the user and route them to the correct page or redirect them to sign in

const { Login, User } = require("../models/database_schema.js");

const userController = {};

// validate current user user
userController.verifyUser = async (req, res, next) => {
  // grab the user name and password of req
  const { username, password } = req.body;

  // use our database to check to see if the user name and password match an existing username and password
  try {
    await Login.findOne({ username: username });
    // if so we route the user to the search page
    // route them to create new user

    res.locals.newUsername = req.body("username");
    res.locals.newUserPassword = req.body("password");
    console.log(
      "newUserEmail",
      res.locals.newUserEmail,
      "newUserPassword",
      res.locals.newUserPassword
    );
    next();
  } catch (err) {
    console.log(
      "we have an error while validating user in homeController",
      err
    );
  }
};

userController.addUser = async (req, res, next) => {
  console.log("in add user controller");
  // grabs the user info off req
  const { username, password } = req.body;
  // adds it to data base and calls next
  console.log("destructored code ===>", username, password);
  try {
    await Login.create({
      username,
      password,
    });
    console.log("made user");
    return next();
  } catch (err) {
    const error = {
      log: `Express error handler caught error when trying to add a new user in userController ${err}`,
      status: 500,
      message: {
        err: "Express error handler caught error when trying to add a new user in userController",
      },
    };
    return next(error);
  }
};

module.exports = userController;

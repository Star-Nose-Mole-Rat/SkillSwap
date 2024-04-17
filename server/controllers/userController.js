// in this file we will validate the user and route them to the correct page or redirect them to sign in
const { User, Profile } = require("../models/database_schema.js");

const userController = {};

// validate current user
userController.verifyUser = async (req, res, next) => {
  // grab the username and password from the request body
  const { username, password } = req.body;
  // locate the user in the db
  try {
    const user = await User.findOne({ username: username });
    // authenticate the password
    if (User.comparePasswords(password, user.password)) {
      return next();
    } else {
      console.log("Invalid credentials!");
      // redirect to homepage to re-login
      return res.redirect("/");
    }
  } catch (err) {
    console.log("No match found for username!");
    // redirect to signup page
    return res.redirect("/signup");
  }
};

// Creates a new user
userController.addUser = async (req, res, next) => {
  // grab the user information from the request body
  const { username, password, displayName } = req.body;
  // add new user to database and create user profile
  console.log("in controller");
  try {
    const newUser = await User.create({
      username,
      password,
    });
    console.log("New user saved to db.");
    console.log(newUser);
    // create profile for new user
    if (!newUser)
      throw new Error({
        log: `Express error handler caught error when trying to add a new profile in userController: ${err}`,
        status: 500,
        message: {
          err: "Express error handler caught error when trying to add a new profile in userController",
        },
      });
    else {
      try {
        const newProfile = await Profile.create({
          displayName,
          username: newUser._id,
          points: 0,
        });
        console.log("New user profile created.");
        console.log(newProfile);
        return next();
      } catch (err) {
        const error = {
          log: `Express error handler caught error when trying to add a new profile in userController: ${err}`,
          status: 500,
          message: {
            err: "Express error handler caught error when trying to add a new profile in userController",
          },
        };
        return next(error);
      }
    }
  } catch (err) {
    const error = {
      log: `Express error handler caught error when trying to add a new user in userController: ${err}`,
      status: 500,
      message: {
        err: "Express error handler caught error when trying to add a new user in userController",
      },
    };
    return next(error);
  }
};

module.exports = userController;

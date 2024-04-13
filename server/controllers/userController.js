// in this file we will validate the user and route them to the correct page or redirect them to sign in

const data = require('mongoose');
const { Login, User } = require('../models/database_schema.js');

const userController = {};

// validate current user user
userController.validateUser = async (req, res, next) => {
  // grab the user name and password of req
  const { username, password } = req.body;

  // use our database to check to see if the user name and password match an existing username and password
  try {
    await Login.findOne({ username: username });
    // if so we route the user to the search page
    // route them to create new user

    res.locals.newUsername = req.body('username');
    res.locals.newUserPassword = req.body('password');
    console.log(
      'newUserEmail',
      res.locals.newUserEmail,
      'newUserPassword',
      res.locals.newUserPassword
    );
    next();
  } catch (err) {
    console.log(
      'we have an error while validating user in homeController',
      err
    );
  }
};

userController.addUser = async (req, res, next) => {
  // grabs the user info off req
  const { displayName, username, password } = req.body;
  // adds it to data base
  try {
    await User.create({
      displayName,
      userName,
      password,
      points: 0,
    });
  } catch (err) {
    // error handeling
    console.log(`there is an error in ${err}`);
  }
};

module.exports = userController;

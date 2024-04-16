// in this file we will validate the user and route them to the correct page or redirect them to sign in
const { User, Profile } = require('../models/database_schema.js');

const userController = {};

// validate current user
userController.verifyUser = (req, res, next) => {
  // grab the username and password from the request body
  const { username, password } = req.body;
  // locate the user in the db
  User.findOne({ username: username })
    .exec()
    .then((user) => {
      // authenticate the password
      if (User.comparePasswords(password, user.password)) {
        return next();
      }
      else {
        console.log('Invalid credentials!');
        return res.redirect('/');
      }
    })
    .catch((err) => {
      console.log('No match found for username!');
      return res.redirect('/signup');
    });
};

// Creates a new user
userController.addUser = (req, res, next) => {
  // grab the user information from the request body
  const { username, password, displayName } = req.body;
  // add new user to database and create user profile
  User.create({
    username,
    password
  })
    .exec()
    .then((newUser) => {
      console.log('New user saved to db.');
      console.log(newUser);
      // create profile for new user
      Profile.create({
        displayName,
        username: newUser._id,
        points: 0
      })
        .exec()
        .then((newProfile) => {
          console.log('New user profile created.');
          console.log(newProfile);
          return next();
        })
        .catch((err) => {
          console.log(`Error in creating new user profile: ${err}`);
          return next({err});
        })
    })
    .catch((err) => {
      const error = {
        log: `Express error handler caught error when trying to add a new user in userController: ${err}`,
        status: 500,
        message: {
          err: 'Express error handler caught error when trying to add a new user in userController',
        }
      };
      return next(error);
    });
};

module.exports = userController;
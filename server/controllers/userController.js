// in this file we will validate the user and route them to the correct page or redirect them to sign in
const { User, Profile } = require('../models/database_schema.js');

const userController = {};

// validate current user
userController.verifyUser = async (req, res, next) => {
  // grab the username and password from the request body
  const { username, password } = req.body;
  // locate the user in the db
  try {
    const user = await User.findOne({ username: username });
    // authenticate the password
    const match = await User.verifyPassword(password, user.password);
    if (match) {
      console.log('User verified!');
      // Return userId back to frontend
      res.locals = {
        userID: user._id,
      };
      return next();
    } else {
      console.log('Invalid credentials!');
      return res.status(504).json({status: 504});
    }
  } catch (err) {
    console.log('No match found for username!');
    return res.status(500).json({status: 500});
  }
};

// Creates a new user
userController.addUser = async (req, res, next) => {
  // grab the user information from the request body
  const { username, password, displayName } = req.body;
  // add new user to database and create user profile
  try {
    const newUser = await User.create({
      username,
      password,
    });
    console.log('New user saved to db.');
    console.log(newUser);
    // create profile for new user
    if (newUser) {
      try {
        const newProfile = await Profile.create({
          displayName,
          username: newUser._id,
          points: 0,
        });
        console.log('New user profile created.');
        console.log(newProfile);
        // Return user and profile id back to frontend
        res.locals = {
          userID: newUser._id,
          profileID: newProfile._id,
        };
        return next();
      }
      catch (err) {
        console.log(`Error in creating new profile: ${err}`);
        return next({err});
      }
    }
  }
  catch (err) {
    console.log(`Error in creating new user: ${err}`);
    return next({err});
  }
};

module.exports = userController;

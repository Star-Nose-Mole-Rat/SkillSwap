// in this file we have the middle ware that serve and update user profile. The middle ware the initalized a user profile is in userController

// import the schema
const { Video, Profile } = require("../models/database_schema.js");
const profileClass = require("../models/profileClass.js");

// add the controller object to export
const profileController = {};

// responds to a request with the infromation on the user profile
profileController.profile = async (req, res, next) => {
  // from what ever is on params, serve the coorisponding user profile info
  const { user } = req.params;
  console.log("user ====> ", user);
  try {
    const profile = await Profile.findOne({ displayName: user });
    console.log("profile ===>", profile);
    if (!profile) throw new Error("user not found");
    // loop through the array of videos
    const videos = await Promise.all(
      profile.videos.map(async (id) => {
        //for each item in videos fetch the schema related to that video id
        const data = await Video.findOne({ _id: id.toString() });
        // const video = await data.json();
        if (!data) {
          // if there is not return for the video, return null
          console.log(`Video with ID ${id} not found`);
          return null;
        }
        console.log("video definition in loop", data.url);
        // return the video urls
        return data.url;
      })
    );
    // use profile class to make a new object to send to front end

    const userObj = new profileClass(profile, videos);
    // send the new user to front end
    res.status(200).json(userObj);
  } catch (err) {
    const error = {
      log: `Express error handler caught error when trying to serve the profile in profileConrtoller ${err}`,
      status: 500,
      message: {
        err: "Express error handler caught error when trying to serve the profile in profileConrtoller",
      },
    };
    return next(error);
  }
};
// Adds a skill to a user profile, increases user points, and also respond to the request with 200
profileController.addSkill = async (req, res, next) => {
  // I will expect the body to have an object on it that looks like this: { url, title, subject, user }
  const { url, title, subject } = req.body;
  // get the user display name off params
  const { user } = req.params;
  // create the video and return the id
  console.log("user ====> ", user);
  try {
    const video = await Video.create({
      subject,
      title,
      url,
    });
    if (!video) throw new Error("unable to create new video in mondoDB");
    const id = video._id.toString();
    // use find one and update user profile to add this video to the array
    // respond to client
    const update = await Profile.findOneAndUpdate(
      { displayName: user },
      { $push: { videos: id }, $inc: { points: 10 } },
      { new: true }
    );
    console.log("updated user ===>", update);
    if (!update) throw new Error("unable to add video to users profile");
    // check for update and if not throw err
    return res.sendStatus(200);
  } catch (err) {
    const error = {
      log: `Express error handler caught error when trying to create add a video in profileConrtoller ${err}`,
      status: 500,
      message: {
        err: "Express error handler caught error when trying to create add a video profileConrtoller",
      },
    };
    return next(error);
  }
};

// Checkes if user has enough points and decrements them if they have enough. responds with a boolean, the un-updated user profile, and 200
profileController.usePoints = async (req, res, next) => {
  const { _id } = req.body;
  let sufficiantPoints;
  console.log("user before fetch ====>", _id);
  try {
    const profile = await Profile.findOneAndUpdate(
      { _id: _id },
      {
        $inc: {
          points: { $cond: { if: { $gt: ["$points", 0] }, then: -1, else: 0 } },
        },
      }
    );
    console.log("profile after fetch ===>", profile);
    profile.points > 0 ? (sufficiantPoints = true) : (sufficiantPoints = false);
    res.status(200).json({ sufficiantPoints, profile });
  } catch (err) {
    const error = {
      log: `Express error handler caught error when trying to update user points in profileConrtoller ${err}`,
      status: 500,
      message: {
        err: "Express error handler caught error when trying to update user points in profileConrtoller",
      },
    };
    return next(error);
  }
};

module.exports = profileController;

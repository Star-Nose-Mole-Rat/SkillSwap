// in this file I need to make a controller that will add a skill using the SkillVideo schema
// respond to a get request from profile that sends the profile back to the client

// import the schema
const { Video, Profile } = require("../models/database_schema.js");
const profileClass = require("../models/profileClass.js");

// add the controller object to export
const profileController = {};

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
        console.log("this is id ====>", id.toString()); // this works
        // the error happens here when I try to fetch a video it retursn a crazy object.
        const data = await Video.findOne({ _id: id.toString() });
        // const video = await data.json();
        if (!data) {
          console.log(`Video with ID ${id} not found`);
          return null;
        }
        console.log("video definition in loop", data.url);
        // return the video urls? (mabye I should be using reduce... )
        return data.url;
      })
    );
    // use profile class to make a new object to send to front end
    // use fine one and update to add 1o points to the user
    const profileIncremented = await findOneAndUpdate(
      { displayName: user },
      { $inc: { points: 10 } },
      { new: true }
    );
    const userObj = new profileClass(profileIncremented, videos);
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
// add middleware, that will add a skill to a user profile and also respond to the request
profileController.addSkill = async (req, res, next) => {
  // I will expect the body to have an object on it that looks like this: { url, title, subject, user }
  const { url, title, subject } = req.body;
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
      { $push: { videos: id } }
    );
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

module.exports = profileController;

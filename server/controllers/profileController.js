// in this file I need to make a controller that will add a skill using the SkillVideo schema

// import the schema
const { SkillVideo, User } = require("../models/database_schema.js");

// add the controller object to export
const profileController = {};

// add middleware, that will add a skill to a user profile and also respond to the request
profileController.addSkill = async (req, res, next) => {
  // I will expect the body to have an object on it that looks like this: { url, title, subject, user }
  const { url, title, subject, user } = req.body;
  console.log("destructuring", url);
  // create the video and return the id
  try {
    const video = await SkillVideo.create({
      subject,
      title,
      url,
    });

    const id = video._id.toString();
    // use find one and update user profile to add this video to the array
    // respond to client
  } catch (err) {
    const error = {
      log: `Express error handler caught error when trying to create a video schema ${err}`,
      status: 500,
      message: {
        err: "Express error handler caught error when trying to create a video schema ",
      },
    };
    return next(error);
  }
  try {
    const update = await findOneAndUpdate(
      { User: user },
      { $push: { skillVido: id } }
    );
    console.log(update);
    return res.sendStatus(200);
  } catch (err) {
    const error = {
      log: `Express error handler caught error when trying to add a skill to a user ${err}`,
      status: 500,
      message: {
        err: "Express error handler caught error when trying to add a skill to a user",
      },
    };
    return next(error);
  }
};

module.exports = profileController;

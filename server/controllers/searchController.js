const { Video } = require("../models/database_schema.js");

const searchController = {};

searchController.searchVideo = async (req, res, next) => {
  console.log("I AM IN searchController.searchVideo", req.query);

  // get search keyword from body/parmas
  // find from video subject
  // return all urls that contains the keyword in subject
  const { searchword } = req.query;
  console.log(
    "I am from searchController.searchVideo, Search Keyword:",
    searchword
  );

  try {
    const query = Video.find({ subject: searchword });
    const videoList = await query.exec();
    // if (videoList.length === 0) {
    //   videoList = null;
    //   return res.status(200).json({ videoList });
    // }
    res.locals.videoList = videoList;
    console.log("res.locals.videoList ====>", res.locals.videoList);
    // res.status(200).json(videoList);
    return next();
  } catch (err) {
    err.status = 404;
    err.message = err;
    next(err);
  }
};

module.exports = searchController;

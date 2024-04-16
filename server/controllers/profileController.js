// // REFERENCE: https://www.npmjs.com/package/multer-gridfs-storage
// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { Login, User, SkillVideo } = require('../models/database_schema.js');
require('dotenv').config();
const uri = process.env.URI;

const connect = mongoose.createConnection(uri, {
  userNewUrlParser: true,
  useUnifiedTopology: true,
});
let gfs;
connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'uploads',
  });
});

const profileController = {};
profileController.addVideo = (req, res) => {
  const storage = new GridFsStorage({
    url: uri,
    options: (req, file),
  });
};

module.exports = profileController;

// REFERENCE: https://www.npmjs.com/package/multer-gridfs-storage
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const { Login, User, SkillVideo } = require('../models/database_schema.js');
require('dotenv').config();
const uri = process.env.URI;

const searchController = {};

searchController.searchVideo = (req, res) => {
    await Skillvideo
};

module.exports = searchController;

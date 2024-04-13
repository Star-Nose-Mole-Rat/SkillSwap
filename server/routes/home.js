const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const path = require('path');
const mongoose = require('mongoose');

// may need to check if this is pointing to the home page html
router.get('/', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

router.post('/', homeController.postNewUser, (req, res) => {
  return res.status(201);
});

// check if credential match , login controller link to the database

// if not correct direct to /signup ,

module.exports = router;

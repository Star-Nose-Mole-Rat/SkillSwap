const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const path = require('path');

// may need to check if this is pointing to the home page html
// when user goes to home page, this will serve the html
router.post('/', userController.router);

// this will route the user that is trying to login to the postNewUser controller
router.post('/login', userController.validateUser, (req, res) => {
  return res.status(201).redirect('/search');
});

// check if credential match , login controller link to the database

// if not correct direct to /signup ,

module.exports = router;

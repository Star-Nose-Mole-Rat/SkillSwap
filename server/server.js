const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController');

const PORT = 8080;

/* Automatically parse urlencoded body content and form data from
incoming requests and place it in req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// root (homepage)
app.get('/', cookieController.setCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// login
app.post('/login', userController.validateUser, cookieController.setSSIDCookie, (req, res) => {
  // On successful login, redirects to search page
  return res.status(200).redirect('/search');
});

// signup
app.get('/signup', (req, res) => {
  // Returns signup page (***need signup page route from frontend****)
  return res.status(200);
});

app.post('/signup', userController.addUser, cookieController.setSSIDCookie, (req, res) => {
  // On successful signup, redirects to search page
  return res.status(200).redirect('/search');
});

//NOTE: catch all route handler for any request to an unknown route
app.use((req, res) => {
  this.response.sendStatus(404);
});





// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };

  //trigger it to run
  defaultErr.log = err.log;
  defaultErr.message = err.message;
  const errorObj = Object.assign({}, defaultErr);
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

// module.exports = app;




	


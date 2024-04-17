const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');

const PORT = 8080;

/* Automatically parse urlencoded body content and form data from
incoming requests and place it in req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../dist')));

// root (homepage)
app.get('/', cookieController.setCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// signup
// app.get('/signup', (req, res) => {
//   // Returns signup page
//   return res.status(200)
// });

// when making a post request to sign up on success will respond with 200
app.post(
  '/signup',
  userController.addUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('new user added');
    return res.sendStatus(200);
  }
);
// from here will can do a port request or a
// app.use('/userprofile', profileRouter);
// app.use('/search', searchRouter);

/* Authorized routes */
app.get('/search', (req, res) => {
  console.log('query', req.query.searchword);
  return res.status(200).send(['banana', 'apple', 'pineapple']);
});

app.get('/profile', (req, res) => {
  return res.status(200);
});

//NOTE: catch all route handler for any request to an unknown route
app.use((req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send('An error occurred (from catch all route handler)');
      }
    });
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  //trigger it to run
  defaultErr.log = err.log;
  defaultErr.message = err.message;
  const errorObj = Object.assign({}, defaultErr);
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

module.exports = app;

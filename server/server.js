const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

// require routers
const userRouter = require('./routes/user.js');
const userController = require('./controllers/userController.js');
// const profileRouter = require('./routes/userprofile.js');
// const searchRouter = require('./routes/search.js');

app.use(express.urlencoded({ extended: true }));
// app.post('submit', (req, res) => {
//   console.log(req.body);
// });
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/login', userController.verifyUser);
app.get('/signup', (req, res) => {
  return res.status(200).redirect('/signup');
});
app.post('/signup', userController.addUser);
// from here will can do a port request or a
// app.use('/userprofile', profileRouter);
// app.use('/search', searchRouter);

//NOTE: catch all route handler for any request to an unknown route
app.use((req, res) => {
  this.response.sendStatus(404);
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

// module.exports = app;

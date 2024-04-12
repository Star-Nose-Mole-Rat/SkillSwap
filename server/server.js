const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

// require routers
const apiRouter = require('./routes/api.js');
const profileRouter = require('./routes/userprofile.js');
const searchRouter = require('./routes/search.js');

app.use(express.json());

app.use('/api', apiRouter);
app.use('/userprofile', profileRouter);
app.use('/search', searchRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
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

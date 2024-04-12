const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const apiRouter = require('./routes/api.js');

app.use(express.json());

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
//NOTE: catch all route handler for any request to an unknown route
app.use((req, res) => {
  this.response.sendStatus(404);
});

// global error handler

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

module.exports = app;

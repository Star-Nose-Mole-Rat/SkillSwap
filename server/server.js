const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {

	return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
	
app.listen(8080);

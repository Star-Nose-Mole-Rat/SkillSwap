const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {

	return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

app.get('/search', (req, res) => {
  console.log('query', req.query.searchword);
  return res.status(200).send(['banana', 'apple', 'pineapple']);
})
	
app.listen(8080);

const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.get('/API/movies', (req, res)=> {
  res.json({ali: 5})
})
app.listen(8000)
const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.get('/api/', (req, res)=> {
  res.send('hi')
})
app.listen(8000)
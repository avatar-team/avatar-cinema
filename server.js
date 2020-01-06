const express    = require('express');
const app        = express()
const bodyParser = require('body-parser');
var path         = require("path")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended :true }))
app.use(express.static(__dirname  + "/client"))


app.get('/api/', (req, res)=> {
  res.send('hi')
})

app.get("/api/movies", (req, res)=>{
  res.send("movies")
})

app.post("/api/reserveFilm", (req, res)=>{
  res.send("reserveFilm")
})

app.post("/api/movies/delete/:id", (req, res)=>{
  res.send("delete")
})

app.post("/api/movies/update/:id", (req, res)=>{
  res.send("delete")
})

app.post("/api/movies/addMovie")

app.listen(8000)
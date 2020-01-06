const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const path       = require("path");
const mongoose   = require("mongoose");
const movieTra   = require('movie-trailer')
const axios      = require('axios') 

//lib for  returing  ID of movie trailer 
//  movieTra('x-men', {id: true}).then( response => console.log( response ) ).catch( err => console.log(err) )


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended :true }))
// app.use(express.static(__dirname  + "/client"))
// app.get("*",(req,res)=>{
// 	res.sendFile(path.join(__dirname  + "/public/app/index.html"))
// })


app.get("/api/movies", (req, res)=>{

  // After reciving  the get respone need to get the data fron the database 
  // and send back the client side 

     var movie = {movieName:""}

  res.json(movie)
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

app.post("/api/movies/addMovie" , )

app.listen(8000)
const express          = require('express');
const app              = express();
const bodyParser       = require('body-parser');
const path             = require("path");
const mongoose         = require("mongoose");
const movieTra         = require('movie-trailer');
const axios            = require('axios');
const movieDb          = require('./db/models/movieModel');
const reservationDb    = require('./db/models/reservationModel');
const adminDb          = require('./db/models/adminModel');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended :true }))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Avatar',(err)=>{
	if(err){
		console.log("not connected to database" + err)
	}else{
		console.log("connected to database")
	}
});


// app.use(express.static(__dirname  + "/client"))
// app.get("*",(req,res)=>{
// 	res.sendFile(path.join(__dirname  + "/public/app/index.html"))
// })


////////////////////////////////////////
/////////////// ROUTES/////////////////
//////////////////////////////////////

// get request for 4 movies from the data base and send it back to frontend interface
app.get("/api/movies", (req, res)=>{

  movieDb.getMovies4Days((err,movie)=>{
    if(movie){
      res.json(movie)
    }else{
      res.json({message:"error reading from the database "})
    }}) 
})
 
// post request for Reservation movie to save it in the database then send the result to frontend 
app.post("/api/reserveFilm",(req,res)=>{

  var data = req.body 

  reservationDb.insertReservation(data,(err,reservation)=>{
   
  reservation ? res.json(data) : res.json({message:"error reading from the database "})

  })
 
})

app.delete("/api/movies/:id", (req, res)=>{

  var id = req.params.id ; 
  movieDb.deleteMovie(id , (err,deleted)=>{
    deleted ? res.json({message:"Movie deleted successfully"}) : res.json({message:"movie not deleted "})
  }) 

})

app.patch("/api/movies/:id", (req, res)=>{
  var id = req.params.id ; 
  movieDb.updateMovie(id,(err,updated)=>{
    deleted ? res.json(updated) : res.json({message:"movie not updated "})
  }) 
  
})

// post request to addmovie to database end send the result back to frontend
app.post("/api/movies/addMovie", (req,res)=>{
  const title =  req.body.Title
  var data  = {...req.body}
  
  movieTra(title, {id: true}).then(response1 =>{
    
    const movieTra = `https://www.youtube.com/embed/${response1}`;
    data.movieTrailer = movieTra
    
    axios.get(`http://www.omdbapi.com/?t=${title}&apikey=a83a53d3`)
    .then(response => {
      let movieInfo = response.data;
      var movieData = {...data ,...movieInfo}
      
      console.log(movieData)
        movieDb.insertMovie(movieData,(err,result) => {
          if(result){
            console.log("data saved")
            res.json(result)
            }else{
            console.log("error saveing the data" )
            res.send(err)
            }
          })  
      })  
    }).catch(err => console.log(err))
} )


app.listen(8000)

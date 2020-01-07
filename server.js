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


mongoose.connect('mongodb://localhost/Avatar',(err)=>{
	if(err){
		console.log("not connected to database" + err)
	}else{
		console.log("connected to database")
	}
});




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended :true }))
// app.use(express.static(__dirname  + "/client"))
// app.get("*",(req,res)=>{
// 	res.sendFile(path.join(__dirname  + "/public/app/index.html"))
// })


app.get("/api/movies", (req, res)=>{

  movieDb.getMovies4Days((err,movie)=>{
    if(movie){
      res.json(movie)
    }else{
      res.json({message:"error reading from the database "})
    }
    
  }
  )
  
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

app.post("/api/movies/addMovie", (req,res)=>{

      const title =  req.body.Title
      var data  = {...req.body}

       movieTra(title, {id: true}).then(response1 =>{

      const movieTra = `https://www.youtube.com/embed/${response1}`;
      data.movieTrailer = movieTra

      axios.get(`http://www.omdbapi.com/?t=${title}&apikey=a83a53d3`)
       .then(response => {
         const movieInfo = response.data;
    
         var data = {...data ,...movieInfo}

         movieDb.insertMovie(data,(err,result) => {
           if(result){
             console.log("data saved")
             res.json(result)
             }else{
             console.log("error saveing the data" )
             }
            })  
        })
          
      }).catch(err => console.log(err))

} )


app.listen(8000)
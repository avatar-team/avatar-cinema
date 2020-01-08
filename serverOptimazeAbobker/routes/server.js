const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");
const movieTra = require('movie-trailer'); //might have to move them in the movieController
const axios = require('axios'); //might have to move them in the movieController
const movieDb = require('./db/models/movieModel'); //might have to move them in the movieController
const reservationDb = require('./db/models/reservationModel'); //might have to move them in the movieController
const adminDb = require('./db/models/adminModel');


const movieRoute = require('./movieRoute')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/movies", movieRoute);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Avatar', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log("not connected to database" + err)
    } else {
        console.log("connected to database")
    }
});

/////////hundlers//////////


//movies//

//////////////

const requestReservation = (req, res) => {
    const data = req.body
    reservationDb.insertReservation(data, (err, reservation) => {
        reservation ? res.json(data) : res.send(err)
    })
}







// app.use(express.static(__dirname  + "/client"))
// app.get("*",(req,res)=>{
// 	res.sendFile(path.join(__dirname  + "/public/app/index.html"))
// })


////////////////////////////////////////
/////////////// ROUTES/////////////////
//////////////////////////////////////

// get request for 4 movies from the data base and send it back to frontend interface



// post request for Reservation movie to save it in the database then send the result to frontend 
app.post("/api/reserveFilm", requestReservation)
    // post request to addmovie to database end send the result back to frontend

app.listen(8000, () => {
    console.log("Server Started")
})
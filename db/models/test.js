const mongoose   = require("mongoose");
mongoose.connect('mongodb://localhost/Avatar',(err)=>{
	if(err){
		console.log("not connected to database" + err)
	}else{
		console.log("connected to database")
	}
});
const movieDb = require('./movieModel');



let movie = {
    Title:"asdqwe",
    Year:123,
    Rated:"SEX",
    Genre:"GENRE",
    Runtime:123,
    Plot:"GENRE",
    Poster:"WWW.ASDWD.ASFD.",
    imdbRating:"GENRE",
    availability:true,
    date: new Date(2020,6,24),
    price:16,
    availableChairs:39,
    playTime: new Date(2020,6,24,12,30,20),
    movieTrailer:"aojfdbiayhg",
    
}

movieDb.insertMovie(movie,(err,res)=>{
    console.log(res,"ADDED")
})

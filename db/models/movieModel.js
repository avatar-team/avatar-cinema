const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//*******************************************//
// all the functions exported from this module is in Error-First-Style// 
//*******************************************//
// mongoose library is REQUIRED//
//*******************************************//


const movieSchema = new Schema({
    Title: {
        type: String,
        required: [true, 'Title of The Movie is Required']
    },
    Year: {
        type: Number,
        required: [true, 'Year of The Movie is Required']
    },
    Rated: {
        type: String,
        default: 'unknown',
        required: [true, 'Rate of The Movie is Required']
    },
    Genre: {
        type: String,
        required: [true, 'Genre of The Movie is Required']
    },
    Runtime: {
        type: Number,
        required: [true, 'Movie Run Time is Required']
    },
    Plot: {
        type: String,
        required: [true, 'Movie Plot Time is Required']
    },
    Poster: {
        type: String,
        required: [true, 'Movie Poster Time is Required']
    },
    imdbRating: {
        type: String,
        required: [true, 'imdbRating Time is Required'],
        default: 'unknown'
    },
    availability: { //added by the admin
        type: Boolean,
        default: false
    },
    date: { //added by the admin
        type: Date,
        required: [true, 'Date of Play is Required']
    },
    price: { //added by the admin
        type: Number,
        required: [true, 'Movie Price is Required'],
        default: 0
    },
    availableChairs: { //added by the admin
        type: Number,
        required: [true, 'Available Chairs is Required']
    },
    playTime: { //added by the admin
        type: Date,
        required: [true, 'Moive Play time  is Required']
    },
    movieTrailer: { //>?
        type: String,
        default: "",
        required: false
    }
});

const Movie = new mongoose.model("Movie", movieSchema);

//this function is used to add a Movie to the database 
//it accepts one Movie Object According to the schema OR array of Objects as well 
const insertMovie = (movie, callback = (err, result) => {}) => {
    Movie.create(movie)
        .then(movie => callback(null, movie))
        .catch(err => callback(err, null))
};

//this is used to update a certain movie record in the movies collection 
// it accepts a object criteria 
// e.g.. -- (e.g.. mean For Example)
/*
update("1231b23bwd", {title:"Spider-Man"}); this is Single item Editing 
update( "1231b23bwd" ,{title:"Spider-Man",playTime:120, date :movieDate }) this is Multi item Editing 
the objectCriteria param must be set respectfully to the movieSchema
*/
const updateMovie = (objectId, criteriaObject, callback = (err, result) => {}) => {
    Movie.findByIdAndUpdate(objectId, criteriaObject)
        .then(movie => callback(null, movie))
        .catch(err => callback(err, null))
};

updateMovie("asdaw213rd3ed", { Title: "qweasd", price: 123, availableChairs: 12 }, (error, result) => {

})

//this method well set The availability state of the movie to false, (making it deleted or Not available)
const deleteMovie = (objectId, callback = (err, result) => {}) => {
    Movie.findByIdAndUpdate(objectId, { availability: false })
        .then(movie => callback(null, movie))
        .catch(err => callback(err, null))
}


//this function well get the movies availble in the next four days, of the availability:TRUE 
//this function only accepts callback function and well pass to that callback the result (array of movies) 
const getMovies4Days = callback => {
    let currentDate = new Date();
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 4);
    findMovies({ "date": { "$gte": currentDate, "$lt": endDate }, availability: true }, callback);

    // Movie.find( { "date": { "$gte": currentDate, "$lt": endDate }, availability: true } )
    //     .then(movies => callback(null, movies))
    //     .catch(err => callback(err, null))
}

//this function well return all the available movies 
//this function only accepts callback function and well pass to that callback the result (array of movies)
const getAllAvailableMovies = callback => {
    findMovies({ availability: true }, callback);
}


//this function well search the database for movies according to the Criteria given in the firstParam
//and well pass the result to the second param to the callback function as followrd by the rules of Err-First Style
//if the param is not given , it well return all the movies in the database 
{ Title: "Spider-Man" }
const findMovies = (objectCriteria = {}, callback) => {
    Movie.find(objectCriteria)
        .then(movies => movies.length === 1 ? callback(null, movies[0]) : callback(null, movies))
        .catch(err => callback(err, null))
}


module.exports.getAllAvailableMovies = getAllAvailableMovies;
module.exports.getMovies4Days = getMovies4Days;
module.exports.deleteMovie = deleteMovie;
module.exports.updateMovie = updateMovie;
module.exports.insertMovie = insertMovie;
module.exports.findMovies = findMovies;
module.exports._movieSchema = movieSchema;
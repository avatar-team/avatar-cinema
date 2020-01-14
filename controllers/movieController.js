const movieTra = require('movie-trailer');
const axios = require('axios');
const movieDb = require('../db/models/movieModel');

/**
 * @function get4Days this function well return all the available movies in the next four days 
 * @param {object} req HTTP request object 
 * @param {object} res response Object (JSEND) containing the array of movie objects   
 */
exports.get4Days = (req, res) => {
    movieDb.getMovies4Days((err, movie) => {
        if (movie) {
            res.json(movie)
        } else {
            res.json({ message: "error reading from the database " })
        }
    })
}

/**
 * @function deleteMovie delete a specific a movie from the database, @note it does not delete the object it just toggle the availability attribute of the movie object to false 
 * @param {object} req HTTP request object, it expects that the params contains the objectId of the movie 
 * @param {object} res response Object  
 */
exports.deleteMovie = (req, res) => {
    var id = req.params.id;
    movieDb.deleteMovie({ _id: id }, (err, deleted) => {
        deleted ? res.json({ message: "Movie deleted successfully" }) : res.json(err)
    })
}

/**
 * @function updateMovie patchs a specific movie in the database, i.e.. update the info of specific movie
 * @param {object} req HTTP request object, it expects that the params contains the objectId of the movie 
 * @param {object} res response Object (JSEND) contians the patched movie 
 */
exports.updateMovie = (req, res) => {
    var id = req.params.id;
    movieDb.updateMovie({ _id: id }, req.body, (err, updated) => {
        updated ? res.json(updated) : res.json(err)
    })

}

/**
 * @function addMovie adds a movie to the database 
 * @param {object} req HTTP request object, it expects that the body of the req well have the movie info that well be added
 * @param {object} res response Object (JSEND) contains the found movie after fetching the info from the api
 */
exports.addMovie = (req, res) => {
    // extract the title from the body
    const title = req.body.Title
        // extract the title from the body, to use it in the url of the movie
    var data = {...req.body }
        //@code movieTra is a module that we used to get the url if the movie 
    movieTra(title, { id: true }).then(response1 => {
        const movieTra = `https://www.youtube.com/embed/${response1}`;
        data.movieTrailer = movieTra
            //fetch the info of the movie from the api (OMDBapi)
        axios.get(`http://www.omdbapi.com/?t=${title}&apikey=a83a53d3`)
            .then(response => {
                //@async response Object is the response from the server that contain a JSON doc containg all the info of the movie 
                if (!response.Response) console.error(response.Error)
                let movieInfo = response.data;
                var movieData = {...data, ...movieInfo }
                movieDb.insertMovie(movieData, (err, result) => {
                    if (result) {
                        res.json([result])
                    } else {
                        res.send(err)
                    }
                })
            })
    }).catch(err => console.error(err))
}
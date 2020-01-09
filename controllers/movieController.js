const movieTra = require('movie-trailer'); //might have to move them in the movieController
const axios = require('axios'); //might have to move them in the movieController
const movieDb = require('../db/models/movieModel'); //might have to move them in the movieController

exports.get4Days = (req, res) => {
    movieDb.getMovies4Days((err, movie) => {
        if (movie) {
            res.json(movie)
        } else {
            res.json({ message: "error reading from the database " })
        }
    })
}
exports.deleteMovie = (req, res) => {
    var id = req.params.id;
    movieDb.deleteMovie({ _id: id }, (err, deleted) => {
        deleted ? res.json({ message: "Movie deleted successfully" }) : res.json(err)
    })
}
exports.updateMovie = (req, res) => {
    var id = req.params.id;
    movieDb.updateMovie({ _id: id }, req.body, (err, updated) => {
        console.log(updated)
        updated ? res.json(updated) : res.json(err)
    })

}
exports.addMovie = (req, res) => {
    const title = req.body.Title
    var data = {...req.body }
    movieTra(title, { id: true }).then(response1 => {
        const movieTra = `https://www.youtube.com/embed/${response1}`;
        data.movieTrailer = movieTra
        axios.get(`http://www.omdbapi.com/?t=${title}&apikey=a83a53d3`)
            .then(response => {
                if (!response.Response) console.log(response.Error)
                let movieInfo = response.data;
                var movieData = {...data, ...movieInfo }
                console.log(movieData)
                movieDb.insertMovie(movieData, (err, result) => {
                    if (result) {
                        console.log("data saved")
                        res.json(result)
                    } else {
                        console.log(err)
                        res.send(err)
                    }
                })
            })
    }).catch(err => console.log(err))
}
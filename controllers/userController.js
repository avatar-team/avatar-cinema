const userModel = require('../db/models/userModel.js')
const reservationModel = require('../db/models/reservationModel.js')

/**
 * @function deleteUser deletes a user fomr the database  
 * @param {object} req HTTP request object, expect to have param id in the req object
 * @param {object} res response Object (JSEND) object with the status true 
 */
exports.deleteUser = (req, res) => {
    userModel.findUser({ _id: req.params.id }, (err, data) => {
        if (err) {
            return res.status(404).json({
                status: false,
                message: "Cant fine a user with that Id",
                error: err
            })
        }
        userModel.deleteUser(data._id, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "error deleting the user ",
                    error: err
                })
            }
            res.status(200).json({
                status: true,
                message: "OK"
            })
        })
    })
}

/**
 * @function findUser finds a specfic user in the database  
 * @param {object} req HTTP request object, expect to the user info the body 
 * @param {object} res response Object (JSEND) the user that match the criteria in the reqest body
 */
exports.findUser = (req, res) => {
    userModel.findUser({ _id: req.params.id }, (err, data) => {
        if (err) res.status(404).send(err);
        res.json(data)
    })
}
exports.getUser = (req, res) => {
    res.status(200).json({
        status: true,
        user: req.body.user
    });
}

//CANCELED
// exports.getRecommendedMovie = (req, res, next) => {
//     userModel.findUser({ _id: req.params.id }, (errUser, userData) => {
//         movieModel.findMovies({ Genre: userData.moviesBought[0].Genre }, (err, data) => {
//             res.json(data)
//         })
//     })
// }

/**
 * @function pushMoviebBought pushs a specific movie into the Boughts movie array of a specific user
 * @param {object} req HTTP request object, expect the body to have the movieId and objectId in the body 
 * @param {object} res response Object (JSEND) 
 */
exports.pushMoviebBought = (req, res) => {
    const { userId, movieId } = req.body;
    userModel.pushMoviesBought(userId, movieId, (err, user) => {
        if (err) {
            res.status(404).json({
                status: false,
                message: "Error in Pushing the Movie into the User Movie boughts",
                error: err
            })
        }
        res.status(201).json({
            status: true,
            message: "OK",
            user
        })
    })
}


/**
 * @function insertFavoriteMovie pushs a specific movie into the Favorites movie array of a specific user
 * @param {object} req HTTP request object, expect the body to have the movieId and objectId in the body 
 * @param {object} res response Object (JSEND) 
 */
exports.insertFavoriteMovie = (req, res) => {
    const { userId, movieId } = req.body;
    userModel.pushFavoriteMovies(userId, { _id: movieId }, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: false,
                message: "Error in Pushing the Movie into the User Movie boughts",
                error: err
            })
        }
        res.status(201).json({
            status: true,
            message: "OK",
            user
        })
    })
}


/**
 * @function insertReservation insert a reservation object to the database 
 * @param {object} req HTTP request object, expect the body to have the reservation in the body 
 * @param {object} res response Object (JSEND) 
 */
exports.insertReservation = (req, res) => {
    const reservation = req.body;
    reservationModel.insertReservation(reservation, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "internal Server Error with saving the reservation into the database",
                error: err
            })
        }
        userModel.pushMoviesBought(reservation.userId, reservation.movieId, (err, movie) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: "internal Server Error with saving the reservation into the database",
                    error: err
                })
            }
        })
        res.status(201).json({
            status: true,
            message: "OK",
            reservation: result
        })
    })
}


/**
 * @function pullFavorite removes a movie from the Favorites movie array of a specific user
 * @param {object} req HTTP request object, expect the body to have the movieId and objectId in the body  
 * @param {object} res response Object (JSEND) 
 */
exports.pullFavorite = (req, res) => {
    const { userId, movieId } = req.params;
    userModel.pullFavoriteMovie(userId, movieId, (err, user) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error with the Database",
                error: err
            })
        }
        res.status(200).json({
            status: true,
            message: "OK",
            user
        })
    })
}
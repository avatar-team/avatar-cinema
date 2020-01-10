const userModel = require('../db/models/userModel.js')
const reservationModel = require('../db/models/reservationModel.js')
exports.deleteUser = (req, res) => {
    userModel.findUser({ _id: req.params.id }, (err, data) => {
        if (err) res.status(404).send(err);
        userModel.deleteUser(data._id, (err, result) => {
            if (err) res.send('Error while deleting');
            res.json({ deleted: true });
        })
    })
}
exports.findUser = (req, res, next) => {
    userModel.findUser({ _id: req.params.id }, (err, data) => {
        if (err) res.status(404).send(err);
        res.json(data)
    })
}
exports.getUser = (req, res, next) => {
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

exports.pushMoviebBought = (req, res, next) => {
    const userId = req.body.userId;
    const movieId = req.body.movieId;
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

// exports.getAllBoughtMovies = (req, res, next) => {
//     const userId = req.param.id;
//     userModel.findUser({ _id: userId }, (err, user) => {
//         res.status(200).json({
//             status: true,
//             message: "OK",
//             data: user[0].moviesBought
//         })
//     })
// }
// exports.getAllFavoriteMovies = (req, res, next) => {
//     const userId = req.param.id;
//     userModel.findUser({ _id: userId }, (err, user) => {
//         res.status(200).json({
//             status: true,
//             message: "OK",
//             data: user[0].favoriteMovies
//         })
//     })
// }

exports.insertFavoriteMovie = (req, res, next) => {
    const { userId, movieId } = req.body;
    userModel.pushFavoriteMovies(userId, movieId, (err, user) => {
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


exports.insertReservation = (req, res, next) => {
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
exports.pullFavorite = (req, res, next) => {
    const { userId, movieId } = req.body;
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
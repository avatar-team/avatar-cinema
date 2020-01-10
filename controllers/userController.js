const userModel = require('../db/models/userModel.js')
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
exports.getRecommendedMovie = (req, res, next) => {
    userModel.findUser({ _id: req.params.id }, (errUser, userData) => {
        movieModel.findMovies({ Genre: userData.moviesBought[0].Genre }, (err, data) => {
            res.json(data)
        })
    })
}
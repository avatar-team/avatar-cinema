exports.deleteUser = (req, res) => {
    userModel.findUser(req.params, (err, data) => {
        console.log(data)
        if (err) res.status(404).send(err);
        userModel.deleteUser(data._id, (err, result) => {
            if (err) res.send('Error while deleting');
            res.json({ deleted: true });
        })
    })
}

exports.findUser = (req, res, next) => {
    userModel.findUser(req.params, (err, data) => {
        if (err) res.status(404).send(err);
        res.json( data )
    })
}

exports.getAllUsers = (req, res, next) => {
    userModel.findUser({}, (err, data) => {
        if (err) res.status(404).send(err);
        res.json( data )
    })
}

exports.getRecommendedMovie = (req, res, next) => {
    userModel.findUser(req.params, (errUser, userData) => {
        movieModel.findMovies({ Genre: userData.moviesBought[0].Genre }, (err, data) => {
            res.json(data)
        })
    })
}
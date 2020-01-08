const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _movieSchema = require('./movieModel')._movieSchema;
const _findMovies = require('./movieModel').findMovies;
//*******************************************//
// all the functions exported from this module is in Error-First-Style// 
//*******************************************//
// mongoose library is REQUIRED//
//*******************************************//

const userSchema = new Schema({
    userName: {
        type: String,
        unique: [true, 'name Most be unique'],
        required: [true, 'name is required']
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false,
        default: ""
    },
    lastName: {
        type: String,
        required: false,
        default: ""
    },
    userEmail: {
        type: String,
        required: true,
        unique: [true, 'email Most be unique'],
        validate: {
            validator: userEmail => userEmail.includes("@"),
            message: 'the email most contain @ character'
        }
    },
    moviesBought: {
        type: [_movieSchema],
        required: false,
        default: []
    },
    favoriteMovies: {
        type: [_movieSchema],
        required: false,
        default: []
    }
});

const User = new mongoose.model("User", userSchema);


//this function inserts a new user to the database 
//the user should be a object with keys and values exactly as the schema Respectively 
const insertUser = (user, callback = (err, result) => {}) => {
    User.create(user)
        .then(user => callback(null, user))
        .catch(err => callback(err, null))
}

//this function updates a user Based on the @(code)criteriaObject
// updateUser("awdw12412e1", {userEmail:"example@example.com"}); this is Single item Editing 
// updateUser( "awdw12412e1" ,{userEmail:"example@example.com",firstName:"sanad" }) this is Multi item Editing
const updateUser = (userObjectId, criteriaObject, callback = (err, result) => {}) => {
    User.findByIdAndUpdate(userObjectId, criteriaObject)
        .then(user => callback(null, user))
        .catch(err => callback(err, null))
}


//this function is used to find a user/users based on a @{objectCriteria} -- an object containing the KEY-VALUE criteria to search with
//it can be anything Object id, firstName , LastName ,etc..
//NOTE_ its recommended to use Object id to return One Single user 
const findUser = (objectCriteria = {}, callback) => {
    User.find(objectCriteria)
        .then(user => user.length === 1 ? callback(null, user[0]) : callback(null, user))
        .catch(err => callback(err, null))
}

const deleteUser = (userObjectId, callback = (err, result) => {}) => {
    User.findByIdAndRemove(userObjectId)
        .then(user => callback(null, user))
        .catch(err => callback(err, null))
}

const pushMoviesBought = (userObjectId, movieObjectId, callback) => {
    _findMovies(movieObjectId, (error, movie) => {
            if (error) {
                callback(error, null)
            }
            updateUser(userObjectId, { $push: { moviesBought: movie } })
        }, callback)
        // updateUser(userObjectId, { $push { moviesBought: } })
}

const pushFavoriteMovies = (userObjectId, movieObjectId, callback) => {
    _findMovies(movieObjectId, (error, movie) => {
            if (error) {
                callback(error, null)
            }
            updateUser(userObjectId, { $push: { favoriteMovies: movie } })
        }, callback)
        // updateUser(userObjectId, { $push { moviesBought: } })
}

module.exports.insertUser = insertUser;
module.exports.updateUser = updateUser;
module.exports.findUser = findUser;
module.exports.deleteUser = deleteUser;
module.exports.pushMoviesBought = pushMoviesBought;
module.exports.pushFavoriteMovies = pushFavoriteMovies;
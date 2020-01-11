const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;
const _movieSchema = require('./movieModel')._movieSchema;
const _findMovies = require('./movieModel').findMovies;
const bcrypt = require('bcryptjs')

//*******************************************//
// all the functions exported from this module is in Error-First-Style// 
//*******************************************//
// mongoose library is REQUIRED//
//*******************************************//



const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, 'name is required'],
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        select: false
    },
    firstName: {
        type: String,
        required: false,
        default: "",
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        default: "",
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: [true, 'email Most be unique'],
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'must be a vailed email']
    },
    moviesBought: {
        type: [_movieSchema],
        required: false
    },
    favoriteMovies: {
        type: [_movieSchema],
        required: false
    }
});

/**
 * this @function pre invocation hashes the password of every record being saved to the database 
 * @note the second parametar MUST BE a normal fucntion, in order to set the scope for @this this to points to the respictive record
 */
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 8);
    next();
})
const User = new mongoose.model("User", userSchema);


/**
 * @function insertUser insert a user into the Database
 * @param {*} user the user expected to be saved
 * @param {*} callback Error-First Callback Function
 * @note the user should be a object with keys and values exactly as the schema Respectively
 */
const insertUser = (user, callback) => {
    findUser({ $or: [{ userName: user.userName }, { userEmail: user.userEmail }] }, (err, result) => {
        if (err) {
            callback(err, null)
        } else if (result.length === 0) {
            User.create(user)
                .then(user => callback(null, user))
                .catch(err => callback(err, null))
        } else {
            if (result[0].userName === user.userName) {
                callback({
                    status: false,
                    message: "username is Duplicated"
                }, null)
            } else if (result[0].userEmail === user.userEmail) {
                callback({
                    status: false,
                    message: "email is Duplicated"
                }, null)
            } else {
                callback({
                    status: false,
                    message: "something went wrong is Duplicated"
                }, null)

            }
        }
    })
}

/**
 * this @function updateUser updates a user Based on the @param criteriaObject
 * @example updateUser("awdw12412e1", {userEmail:"example@example.com"}); this is Single item Editing 
 * @example updateUser( "awdw12412e1" ,{userEmail:"example@example.com",firstName:"sanad" }) this is Multi item Editing
 */
const updateUser = (userObjectId, criteriaObject, callback = (err, result) => {}) => {
    User.findByIdAndUpdate(userObjectId, criteriaObject)
        .then(user => callback(null, user))
        .catch(err => callback(err, null))
}

/**
 * this @function findUser is used to find a user/users based on a @param objectCriteria -- an object containing the KEY-VALUE criteria to search with
 * it can be anything Object id, firstName , LastName ,etc..
 * @note its recommended to use Object id to return One Single user
 * @param {*} objectCriteria in used to search the database based in a spicific criteria
 * @param {*} callback Error-First Callback function   
 */
const findUser = (objectCriteria = {}, callback) => {
    User.find(objectCriteria)
        .then(user => callback(null, user))
        .catch(err => callback(err, null))
}

/** 
 * @function deleteUser is used to delete a specific user based on @param userObjectId 
 * @param {*} userObjectId object id of the user to be deleted
 * @param {*} callback Error-First Callback function  
 */
const deleteUser = (userObjectId, callback = (err, result) => {}) => {
    User.findByIdAndRemove(userObjectId)
        .then(user => callback(null, user))
        .catch(err => callback(err, null))
}


/**  
 * @function pushMoviesBought is used to push new movie to the @code MoviesBoughts property 
 * @param {*} userObjectId object id of the user to push the movie into
 * @param {*} movieObjectId the movie id 
 * @param {*} callback Error-First Callback function  
 */
const pushMoviesBought = (userObjectId, movieObjectId, callback) => {
    _findMovies(movieObjectId, (error, movie) => {
            if (error) {
                callback(error, null)
            }
            updateUser(userObjectId, { $push: { moviesBought: movie } })
        }, callback)
        // updateUser(userObjectId, { $push { moviesBought: } })
}

/**  
 * @function pushFavoriteMovies is used to push new movie to the @code FavoriteMovies property 
 * @param {*} userObjectId object id of the user to push the movie into
 * @param {*} movieObjectId the movie id 
 * @param {*} callback Error-First Callback function  
 */
const pushFavoriteMovies = (userObjectId, movieObjectId, callback) => {
    _findMovies(movieObjectId, (error, movie) => {
            if (error) {
                callback(error, null)
            }
            updateUser(userObjectId, { $push: { favoriteMovies: movie } })
        }, callback)
        // updateUser(userObjectId, { $push { moviesBought: } })
}


/**
 * @function pullFavoriteMovie this function is used to remove a movie from a user's favorate movies array
 * @param {*} userObjectId Objectid of the user to pull the movie from 
 * @param {*} movieObjectId the Object Id of the movie to be deleted 
 * @param {*} callback Error-First Callback Function
 */
const pullFavoriteMovie = (userObjectId, movieObjectId, callback = () => {}) => {
    updateUser({ _id: userObjectId }, { $pull: { favoriteMovies: { _id: movieObjectId } } }, callback);
}

//User.findByIdAndUpdate({ _id: "5e18813b5fdce621accc1ba8" }, { $pull: { moviesBought: { _id: "" } } }).then(e => { console.log(e) })
module.exports.insertUser = insertUser;
module.exports.updateUser = updateUser;
module.exports.findUser = findUser;
module.exports.deleteUser = deleteUser;
module.exports.pushMoviesBought = pushMoviesBought;
module.exports.pushFavoriteMovies = pushFavoriteMovies;
module.exports.pullFavoriteMovie = pullFavoriteMovie;
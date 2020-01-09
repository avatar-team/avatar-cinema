const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;
const _movieSchema = require('./movieModel')._movieSchema;
const _findMovies = require('./movieModel').findMovies;
const brcypt = require('bcryptjs')
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

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = brcypt.hashSync(this.password, 8);
    next();
})


const User = new mongoose.model("User", userSchema);

//this function inserts a new user to the database 
//the user should be a object with keys and values exactly as the schema Respectively 
const insertUser = (user, callback) => {

        findUser({ userName: user.userName }, (err, result) => {
            if (err) {

                callback(err, null)
            } else if (result.length === 0) {
                User.create(user)
                    .then(user => callback(null, user))
                    .catch(err => callback({
                        status: false,
                        message: "email is Duplicated"
                    }, null))
            } else {
                callback({
                    status: false,
                    message: "username is Duplicated"
                }, null)
            }

        })

    }
    // User.create(user)
    //     .then(user => callback(null, user))
    //     .catch(err => callback(err, null))
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
        .then(user => callback(null, user))
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
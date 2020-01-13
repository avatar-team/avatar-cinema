const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _findMovies = require('./movieModel').findMovies;
const _updateMovie = require('./movieModel').updateMovie;
const _userFunction = require('./userModel')
const validator = require('validator')

//*******************************************//
// all the functions exported from this module is in Error-First-Style// 
//*******************************************//
// mongoose library is REQUIRED//
//*******************************************//

const reservationSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
    movieId: {
        type: String,
        required: true,
        trim: true
    },
    playDate: {
        type: Date
    },
    price: {
        type: Number,
        min: 0,
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Price need to be > 0'
        }
    },
    title: String
});
const Reservation = new mongoose.model("Reservation", reservationSchema);

/**
 * @function insertReservation is used to add a reservation to the database 
 * it accepts one @param reservation Object According to the schema OR array of Objects as well 
 * @param reservation Object to be added in the database 
 * @param callback Error-First Callback Function 
 */
const insertReservation = (reservation, callback) => {
    _findMovies({ _id: reservation.movieId }, (error, movie) => {
        if (error) {
            callback(error, null);
        } else if (movie[0].availableChairs <= 0) {
            callback("No More Available Chairs For this Movie", null);
        } else {
            _updateMovie(movie[0]._id.toString(), { $inc: { availableChairs: -1 } }, (err, data) => {
                if (err) {} else {
                    _userFunction.pushMoviesBought(reservation.userId, { _id: reservation.movieId }, (err, data) => {
                        if (err) {
                            return console.log(err)
                        }
                    });
                }
            });

        }

    })
    Reservation.create(reservation)
        .then(reservation => callback(null, reservation))
        .catch(err => callback(err, null));
};


/** 
 * this is used to update a certain reservation record in the reservations collection 
 * it accepts a object criteria 
 * e.g.. 
 *         @param objectID        @param criteriaObject
 * @example update("1231b23bwd", {clientName:Abobker}); this is Single item Editing 
 * @example update( "1231b23bwd" , {clientName:"Abobker",movieTitle:"example@example.con"} ) this is Multi item Editing 
 * @param criteriaObject param must be set respectfully to the @code reservationSchema
 * 
 * @param objectId of the Reservation object to be edited
 * @param criteriaObject the object that contains the updated info 
 * @param callback Error-First Style Callback function
 */

const updateReservation = (objectId, criteriaObject, callback = (err, result) => {}) => {
    Reservation.findByIdAndUpdate(objectId, criteriaObject)
        .then(reservation => callback(null, reservation))
        .catch(err => callback(err, null))
};

/**
 * this @function findReservation well search the database for reservations according to the @param objectCriteria given in the firstParam
 * and well pass the result to the secound @param callback function as followed by the rules of Err-First Style
 * @param objectCriteria the object that contains Criteria to be searched with
 * @param callback Error-First Style Callback function
 */
const findReservation = (objectCriteria = {}, callback) => {
    Reservation.find(objectCriteria)
        .then(reservations => callback(null, reservations))
        .catch(err => callback(err, null))
}

module.exports.insertReservation = insertReservation;
module.exports.updateReservation = updateReservation;
module.exports.findReservation = findReservation;
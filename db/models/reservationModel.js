const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _findMovies = require('./movieModel').findMovies;
const _updateMovie = require('./movieModel').updateMovie;
const validator = require('validator')
    //*******************************************//
    // all the functions exported from this module is in Error-First-Style// 
    //*******************************************//
    // mongoose library is REQUIRED//
    //*******************************************//

const reservationSchema = new Schema({
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    clientEmail: {
        type: String,
        validate: [validator.isEmail, 'must be a vailed email'],
        required: true,
        unique: true,
        trim: true
    },
    movieTitle: {
        type: String,
        required: true,
        trim: true
    }
});
const Reservation = new mongoose.model("Reservation", reservationSchema);

/**
 * @function insertReservation is used to add a reservation to the database 
 * it accepts one @param reservation Object According to the schema OR array of Objects as well 
 * @param reservation Object to be added in the database 
 * @param callback Error-First Callback Function 
 */
const insertReservation = (reservation, callback) => {
    _findMovies({ Title: reservation.movieTitle }, (error, movie) => {
        if (error) {
            callback(error, null);
        } else if (movie.availableChairs <= 0) {
            callback(new Error("There Are No more Available Chairs"), null);
        } else {
            _updateMovie(movie._id.toString(), { $inc: { availableChairs: -1 } });
            Reservation.create(reservation)
                .then(reservation => callback(null, reservation))
                .catch(err => callback(err, null));
        }
    })
};


/** 
 * this is used to update a certain reservation record in the reservations collection 
 * it accepts a object criteria 
 * e.g.. 
 *         @param objectID        @param criteriaObject
 * @example update("1231b23bwd", {clientName:Abobker}); this is Single item Editing 
 * @example update( "1231b23bwd" , {clientName:"Abobker",movieTitle:"example@example.con"} ) this is Multi item Editing 
 * @param criteriaObject param must be set respectfully to the @code reservationSchema
 */

const updateReservation = (objectId, criteriaObject, callback = (err, result) => {}) => {
    Reservation.findByIdAndUpdate(objectId, criteriaObject)
        .then(reservation => callback(null, reservation))
        .catch(err => callback(err, null))
};

/**
 * this @function findReservation well search the database for reservations according to the @param objectCriteria given in the firstParam
 * and well pass the result to the secound @param callback function as followrd by the rules of Err-First Style
 */
const findReservation = (objectCriteria = {}, callback) => {
    Reservation.find(objectCriteria)
        .then(reservations => callback(null, reservations))
        .catch(err => callback(err, null))
}

module.exports.insertReservation = insertReservation;
module.exports.updateReservation = updateReservation;
module.exports.findReservation = findReservation;
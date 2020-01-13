const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const router = express.Router();



/**
 * @route GET /api/user
 * @description get the info of the user, @note here the middleware is responsable to get the correct user, based on his token
 * @note you can extract the id of the user from the JWT token 
 * @access private
 */
router.route('/')
    .get(authController.protect, userController.getUser);

/**
 * @route POST /api/user/favorite
 * @description adds a movie as a favorite movie for a specific user 
 * @access public 
 */
router.route("/favorite")
    .post(userController.insertFavoriteMovie);

/**
 * @route DELETE /api/user/favorite
 * @description removes a movie from the favorite movies for a specific user 
 * @param userId objectId of the user 
 * @param movieId objectId of the movie 
 * @access public 
 */
router.route("/favorite/:userId/:movieId")
    .delete(userController.pullFavorite);

/**
 * @route GET /api/user/:id
 * @description finds a specific user based on his objectId
 * @param id objectId of the user 
 * @access public 
 * 
 * @route DELETE /api/user/:id
 * @description deletes a specific user based on his objectId 
 * @param id objectId of the user 
 * @access public 
 */
router.route('/:id')
    .get(userController.findUser)
    .delete(userController.deleteUser);

//  CANCELED  //
// router.route('/:userName/recommendedMovies') //
//     .get(userController.getRecommendedMovie); //

/**
 * @route POST /api/user/reservation
 * @description insert into reservation collection, decrese available chairs and add this movie to the moviesBought of that user
 * @access public
 */
router.route('/reservation')
    .post(userController.insertReservation);
module.exports = router;
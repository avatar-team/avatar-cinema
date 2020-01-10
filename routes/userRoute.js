const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const router = express.Router();

router.route('/')
    .get(authController.protect, userController.getUser);
router.route('/:id')
    .get(userController.findUser)
    .delete(userController.deleteUser);
//CANCELED
// router.route('/:userName/recommendedMovies')
//     .get(userController.getRecommendedMovie);


router.route('/reservation')
    .post(userController.insertReservation)
    //insert into reservation collation AND decrese availbale chairs AND add this movie to the movieboughrs of that user
    //@return 
router.route("/favorite")
    .post(userController.insertFavoriteMovie) //hundle this functions
    .delete(userController.pullFavorite)
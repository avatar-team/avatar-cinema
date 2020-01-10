const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const router = express.Router();

<<<<<<< HEAD
=======


// router.post('/signup', authController.signup)
// router.post('/login', authController.login)

>>>>>>> d0c5804dd415b04d7ca4a1f78f2f28a0d2f53b01
router.route('/')
    .get(authController.protect, userController.getUser)
router.route('/:userName')
    .get(userController.findUser)
    .delete(userController.deleteUser)
router.route('/:userName/recommendedMovies')
    .get(userController.getRecommendedMovie)
module.exports = router;
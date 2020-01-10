const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const router = express.Router();



// router.post('/signup', authController.signup)
// router.post('/login', authController.login)

router.route('/')
    .get(authController.protect, userController.getUser)
router.route('/:userName')
    .get(userController.findUser)
    .delete(userController.deleteUser)
router.route('/:userName/recommendedMovies')
    .get(userController.getRecommendedMovie)
module.exports = router;
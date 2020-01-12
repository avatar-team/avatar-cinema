const express = require('express');
const movieController = require('../controllers/movieController.js');
const router = express.Router();
const adminController = require('../controllers/adminController').protectAdmin


router.route("/")
    .get(movieController.get4Days)
    .post( movieController.addMovie);

router.route("/:id")
    .delete(adminController, movieController.deleteMovie)
    .patch(adminController, movieController.updateMovie)

module.exports = router;
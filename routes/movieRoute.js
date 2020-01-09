const express = require('express');
const movieController = require('../controllers/movieController.js');
const router = express.Router();


router.route("/")
    .get(movieController.get4Days)
    .post(movieController.addMovie);

router.route("/:id")
    .delete(movieController.deleteMovie)
    .patch(movieController.updateMovie)

module.exports = router;
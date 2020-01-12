const express = require('express');
const movieController = require('../controllers/movieController.js');
const router = express.Router();
const protectAdmin = require('../controllers/adminController').protectAdmin


/**
 * @route GET /api/movies
 * @description this route get the movies available in the next four days and return them as json document 
 * @access public
 * 
 * @route POST /api/movies
 * @description adds a movie to the database 
 * @access private
 */
router.route("/")
    .get(movieController.get4Days)
    .post( movieController.addMovie);

/**
 * @route DELETE /api/movies/:id
 * @description Deletes a movie from the database 
 * @param id the objectid of the movie to be deleted 
 * @access private
 * 
 * @route PATCH /api/movies/:id
 * @description edits a movie in the database @note (Patch) meaning only edit one field not the entire object 
 * @param id the objectid of the movie to be patched 
 * @access private
 */
router.route("/:id")
    .delete(protectAdmin, movieController.deleteMovie)
    .patch(protectAdmin, movieController.updateMovie)


module.exports = router;
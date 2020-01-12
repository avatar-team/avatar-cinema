const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

/**
 * @route GET /api/admin
 * @description this is the main dashboard for the admin 
 * @access private
 */
router.route("/")
    .get(adminController.protectAdmin, adminController.hundleMainDashboard)

/**
 * @route GET /api/admin/login
 * @description login page for the admin 
 * @access public
 */
router.route("/login")
    .post(adminController.hundleSginin)

module.exports = router;
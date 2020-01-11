const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.route("/")
    .get(adminController.protectAdmin, adminController.hundleMainDashboard)

router.route("/login")
    .post(adminController.hundleSginin)

module.exports = router;
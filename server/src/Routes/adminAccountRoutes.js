const express = require('express');
const router = express.Router();
const adminAccountController = require('../Controllers/adminAccountController');


router.post('/add-admin-account', adminAccountController.addAdminAccount);

router.post('/get-admin-account-by-key', adminAccountController.getAdminAccountByKey);

module.exports = router;
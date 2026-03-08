const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/bookingController');


router.post('/add-booking-data', bookingController.addBookingData);

router.get('/get-all-booking-data', bookingController.getAllBookingData);

router.get('/get-booking-data-by-key', bookingController.getBookingDataByKey);

router.get('/get-booking-data-by-month', bookingController.getBookingDataByMonth);

router.post('/update-booking-data-status', bookingController.updateBookingStatus);

router.post('/update-user-booking-data', bookingController.updateUserBookingData);

module.exports = router;
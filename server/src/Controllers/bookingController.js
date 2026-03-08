const bookingServices = require('../Services/bookingServices');
const nodemailer = require('nodemailer');
require("dotenv").config();

const APP_PASSWORD = process.env.APP_PASSWORD;
// Create a transporter using a free SMTP service (e.g., Gmail)
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gerald.fegalan@gmail.com',
    pass: APP_PASSWORD // use app password if 2FA is enabled
  }
});


// --------- Create ---------
const addBookingData = async (req, res) => {
    try {
        const bookingData = req.body; 
      
        console.log(bookingData)

        const newBookingData = await bookingServices.addBookingData(bookingData);
        
        res.status(200).json(newBookingData); 
    } catch (err) {
        console.error("Error in adding booking data controller:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// --------- READ ---------
const getAllBookingData = async (req, res) => {
    try {
        const data = await bookingServices.getAllBookingData();

        res.status(200).json(data);
    } catch (err) {
        console.error("Error in getting booking data controller:", err);
        res.status(500).json({ message: 'Server error' });
    }
};


const getBookingDataByKey = async (req, res) => {
    try {
      
      const { key, value } = req.query;

      
      const data = await bookingServices.getBookingDataByKey(key, value);
  
      res.status(200).json(data);
    } catch (err) {
      console.error("Error in getting booking data controller:", err);
      res.status(500).json({ message: 'Server error' });
    }
};

const getBookingDataByMonth = async (req, res) => {
    try {
      const { month } = req.query;
      const data = await bookingServices.getBookingDataByMonth(month);
  
      res.status(200).json(data);
    } catch (err) {
      console.error("Error in getting booking data controller:", err);
      res.status(500).json({ message: 'Server error' });
    }
};

const updateBookingStatus = async (req, res) => {
  try {
    const bookingData  = req.body;

    const updatedStatusData = await bookingServices.updateBookingStatus(bookingData);

    if (bookingData.booking_date) {
      const et = generateBookingToken(bookingData.booking_date)
      const link = `http://localhost:3000/booking/booking-form/edit?receipt_number=${bookingData.receipt_number}&&et=${et}`

      if (bookingData.status == "upcoming"){
          // Set up email data
          let mailOptions = {
              from: '"Uncle Drew Sports Center" <your@email.com>',
              to: bookingData.email,
              subject: 'Booking Appointment Receipt – Uncle Drew Sports Center',
              text: `Hello,
              
                  Thank you for booking with Uncle Drew Sports Center!
                  Here are the important details regarding your booking:
                  - This email serves as your booking receipt.
                    Receipt Number: ${bookingData.receipt_number}
                  - You can use the receipt number to track the status of your appointment.
                  - Please wait for the admin to review and update your booking status.
                  - If you wish to modify your booking, you can do so via the provided link. 
                    ${link}
                    *Note: Rebooking is allowed only up to 2 days before your reservation date.*
                  - All bookings are non-refundable.

                  We appreciate your trust in us!

                  Sincerely,
                  Uncle Drew Sports Center Team`
            };


          if (updatedStatusData){
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Email sent:', info.response);
            });
          }
      }
    }

    res.status(200).json(updatedStatusData);
  } catch (err) {
    console.error("Error in getting booking data controller:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserBookingData = async (req, res) => {
  try {
    const bookingData  = req.body;

    const data = await bookingServices.updateUserBookingData(bookingData);

    res.status(200).json(data);
  } catch (err) {
    console.error("Error in getting booking data controller:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const generateBookingToken = (bookingDateStr) => {
  const bookingDate = new Date(bookingDateStr);

  if (isNaN(bookingDate.getTime())) {
    throw new Error("Invalid date format. Use a format like 'May 25, 2025'.");
  }

  const expirationDate = new Date(bookingDate);
  expirationDate.setDate(expirationDate.getDate() - 1); // e.g., June 9 if June 10

  const payload = {
    expires: expirationDate.toISOString(),
  };

  const token = btoa(JSON.stringify(payload)); // base64 encode
  return token;
};


module.exports = { 
  addBookingData, 
  getAllBookingData, 
  getBookingDataByKey, 
  getBookingDataByMonth, 
  updateBookingStatus,
  updateUserBookingData
};

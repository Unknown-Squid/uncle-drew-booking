const bookingModel = require("../Models/bookingModel");
const { Op } = require('sequelize');


const addBookingData = async (bookingData) => {
    try {
        const newBookingData = await bookingModel.create(bookingData);
        return newBookingData; 
    } catch (err) {
        console.error("Error adding booking data:", err);
        throw err;  
    }
};

const getAllBookingData = async () => {
    try {
        return await bookingModel.findAll();
    } catch (error) {
        console.error("Error fetching booking data:", error);
        throw error;
    }
};

const getBookingDataByKey = async (key, value) => {
    try {
      // Validate that the key is a valid field name
      const validKeys = ['id', 'booking_date', 'receipt_number']; 
      if (!validKeys.includes(key)) {
        throw new Error(`Invalid key: ${key}`);
      }
  
      // Perform the dynamic query
      return await bookingModel.findAll({
        where: {
          [key]: value, // Dynamically set the key and value
        },
      });
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
};

const getBookingDataByMonth = async (month) => {
  try {
    return await bookingModel.findAll({
      where: {
        booking_date: {
          [Op.like]: `${month}%`,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

const updateBookingStatus = async (bookingData) => {
  try {
    const result = await bookingModel.update(
      {
        status: bookingData.status,
      },
      {
        where: { id: bookingData.id },
      }
    );

    return result;
  } catch (err) {
    console.error("Error updating booking status:", err);
    throw err;
  }
};

const updateUserBookingData = async (bookingData) => {
  try {
    const result = await bookingModel.update(
      {
        name: bookingData.name,
        email: bookingData.email,
        phone_number: bookingData.phone_number,
        event_type: bookingData.event_type,
        message_request: bookingData.message_request,
        booking_type: bookingData.booking_type,
        booking_date: bookingData.booking_date,
        booking_time: bookingData.booking_time,
        booking_duration: bookingData.booking_duration,
        sports_center_settings: bookingData.sports_center_settings,
        score_board_shot_clock_operator: bookingData.score_board_shot_clock_operator,
        speaker_mic: bookingData.speaker_mic,
        ball: bookingData.ball,
        total: bookingData.total,
        total2: bookingData.total2,
        payment_preference: bookingData.payment_preference,
        payment_method: bookingData.payment_method,
        credit_card: bookingData.credit_card,
        downpayment: bookingData.downpayment,
        status: bookingData.status
      },
      {
        where: { receipt_number: bookingData.receipt_number },
      }
    );

    return result;
  } catch (err) {
    console.error("Error updating booking status:", err);
    throw err;
  }
};

module.exports = {
    addBookingData, 
    getAllBookingData,
    getBookingDataByKey,
    getBookingDataByMonth,
    updateBookingStatus,
    updateUserBookingData
};

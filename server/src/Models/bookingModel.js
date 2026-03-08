const { DataTypes } = require("sequelize");
const sequelize = require('../../configs/config');

const BookingReceipt = sequelize.define(
  "BookingReceipt",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true, 
      allowNull: false,
    },
    receipt_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    reference_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    event_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    message_request: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    booking_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    booking_date: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    booking_time: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    booking_duration: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sports_center_settings: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    score_board_shot_clock_operator: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    ball: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    speaker_mic: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    total2: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    payment_preference: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    credit_card: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    downpayment: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
  },
  {
    tableName: "booking_receipt",
    timestamps: true, 
    freezeTableName: true, 
    underscored: true, 
  }
);
  
module.exports = BookingReceipt;

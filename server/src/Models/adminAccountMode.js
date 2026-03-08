const { DataTypes } = require("sequelize");
const sequelize = require('../../configs/config');

const AdminAccount = sequelize.define(
  "AdminAccount",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true, 
      allowNull: false,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
  }
  },
  {
    tableName: "admin_account",
    timestamps: true, 
    freezeTableName: true, 
    underscored: true, 
  }
);
  
module.exports = AdminAccount;

const adminAccountMode = require("../Models/adminAccountMode");

const addAdminAccount = async (adminAccountData) => {
    try {
        const newAdminAccountData = await adminAccountMode.create(adminAccountData);
        return newAdminAccountData; 
    } catch (err) {
        console.error("Error adding booking data:", err);
        throw err;  
    }
};

const getAdminAccountByKey = async (key, value) => {
    try {
      // Validate that the key is a valid field name
      const validKeys = ['id', 'username']; 
      if (!validKeys.includes(key)) {
        throw new Error(`Invalid key: ${key}`);
      }
  
      // Perform the dynamic query
      return await adminAccountMode.findAll({
        where: {
          [key]: value, // Dynamically set the key and value
        },
      });
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
};


const updateAdminAccountToken = async (adminAccountData) => {
  try {
    const result = await adminAccountMode.update(
      {
        token: adminAccountData.token,
      },
      {
        where: { username: adminAccountData.username },
      }
    );

    return result;
  } catch (err) {
    console.error("Error updating admin account token:", err);
    throw err;
  }
};

module.exports = {
    addAdminAccount,
    getAdminAccountByKey,
    updateAdminAccountToken
};

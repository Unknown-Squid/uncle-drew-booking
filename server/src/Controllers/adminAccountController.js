const adminAccountServices = require('../Services/adminAccountServices');
const bcrypt = require('bcrypt');
const saltRounds = 10; // The number of salt rounds for bcrypt

// --------- Create ---------
const addAdminAccount = async (req, res) => {
    try {
        const adminAccountData = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(adminAccountData.password, saltRounds);
        
        // Replace the plain text password with the hashed password
        adminAccountData.password = hashedPassword;

        // Now you can save the admin account data (with the hashed password)
        const newAdminAccountData = await adminAccountServices.addAdminAccount(adminAccountData);
        
        res.status(200).json(newAdminAccountData); 
    } catch (err) {
        console.error("Error in adding admin account data controller:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// --------- READ ---------
const getAdminAccountByKey = async (req, res) => {
  try {
      const { username, password } = req.body;

      // Fetch the user account data based on the provided username
      const data = await adminAccountServices.getAdminAccountByKey("username", username);

      if (data.length > 0) {
          // Check if the entered password matches the stored hashed password
          const isPasswordCorrect = await verifyPassword(password, data[0].password); // Assuming data is an array and we're accessing the first item

          if (isPasswordCorrect) {
              const updatingTokenData = {
                username: username,
                token: generateRandomToken(16)
              }
              const result = await updateAdminAccountToken(updatingTokenData)

              if (result){
                 // Successfully logged in, return status 200 and the user data
                data[0].token = updatingTokenData.token;
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully logged in',
                    data: data[0] 
                });
              }
          } else {
              // Incorrect password, return status 401 (Unauthorized)
              res.status(401).json({
                  status: 'failed',
                  message: 'Wrong password or username',
              });
          }
      } else {
          // Account doesn't exist, return status 404 (Not Found)
          res.status(404).json({
              status: 'failed',
              message: "Account doesn't exist",
          });
      }
  } catch (err) {
      console.error("Error in getting admin account data controller:", err);
      res.status(500).json({ message: 'Server error' });
  }
};

// Verify password function
const verifyPassword = async (enteredPassword, storedHashedPassword) => {
  const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
  return isMatch;
};

const updateAdminAccountToken = async (adminAccountData) => {
  try {
    const data = await adminAccountServices.updateAdminAccountToken(adminAccountData);

    return data
  } catch (err) {
    console.error("Error in getting booking data controller:", err);
    return false
  }
};

function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}



module.exports = { 
  addAdminAccount, 
  getAdminAccountByKey,
  updateAdminAccountToken
};

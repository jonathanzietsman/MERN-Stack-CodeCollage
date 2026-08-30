require("dotenv").config();
const jwt = require("jsonwebtoken");

// Utility function to sign JWT containing user ID with a 3-day expiration
module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
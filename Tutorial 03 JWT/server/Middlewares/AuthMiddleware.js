const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware function to verify JWT sent in client cookies
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  
  // Return unauthenticated status if token cookie is missing
  if (!token) {
    return res.json({ status: false })
  }
  
  // Verify token signature against secret key
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      // Find matching user in database using payload ID
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}
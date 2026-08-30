const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// Controller for handling new user registration
module.exports.Signup = async (req, res, next) => {
	try {
		const { email, password, username, createdAt } = req.body;
		
		// Check if a user with the provided email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ message: "User already exists" });
		}
		
		// Create and store the new user document in MongoDB
		const user = await User.create({ email, password, username, createdAt });
		
		// Generate JWT token using the newly created user's ID
		const token = createSecretToken(user._id);
		
		// Set authentication cookie in the response
		res.cookie("token", token, {
			httpOnly: false,
			sameSite: "lax",
			secure: false,
		});
		
		// Send success status along with user payload
		res
			.status(201)
			.json({ message: "User signed in successfully", success: true, user });
		next();
	} catch (error) {
		console.error(error);
	}
};

// Controller for authenticating existing users
module.exports.Login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		
		// Validate that required credentials are provided
		if (!email || !password) {
			return res.json({ message: "All fields are required" });
		}
		
		// Locate user record by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: "Incorrect password or email" });
		}
		
		// Verify if provided password matches hashed password in database
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.json({ message: "Incorrect password or email" });
		}
		
		// Generate authentication JWT token
		const token = createSecretToken(user._id);
		
		// Set authentication cookie
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		
		// Send successful login response
		res
			.status(201)
			.json({ message: "User logged in successfully", success: true });
		next();
	} catch (error) {
		console.error(error);
	}
};
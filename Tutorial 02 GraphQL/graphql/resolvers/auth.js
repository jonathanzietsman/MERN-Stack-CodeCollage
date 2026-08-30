const bcrypt = require("bcryptjs"); // Used to hash and compare passwords securely
const User = require("../../models/user"); // Mongoose model for User database operations
const jwt = require("jsonwebtoken"); // Used to generate JSON Web Tokens for authentication

module.exports = {
    // Resolver to handle new user registration
    createUser: async (args) => {
        try {
            // Check if a user with the provided email already exists in the database
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error("User exists already.");
            }
            // Hash the plaintext password with a salt round of 12 for security
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            
            // Create a new User document instance
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            });
            
            // Save the user to MongoDB
            const result = await user.save();
            
            // Return user data, setting password to null so it's never sent back to the client
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    
    // Resolver to handle user login and authentication
    login: async ({ email, password }) => {
        // Find the user by their email address
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        
        // Compare the provided plaintext password with the hashed password stored in DB
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is Incorrect');
        }
        
        // Generate a signed JWT containing user details, valid for 1 hour
        const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
            expiresIn: '1h'
        });
        
        // Return authentication metadata required by the AuthData GraphQL type
        return { userId: user.id, token: token, tokenExpiration: 1};
    }
};
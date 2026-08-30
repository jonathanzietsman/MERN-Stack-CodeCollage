// ==========================================
// 1. MODULE IMPORTS
// ==========================================
// Import Mongoose to manage MongoDB data schemas and models
const mongoose = require('mongoose');

// Extract the Schema constructor from Mongoose
const Schema = mongoose.Schema;

// ==========================================
// 2. USER SCHEMA DEFINITION
// ==========================================
// Define the structure (blueprint) for every User document in the database
const userSchema = new Schema({
    // User's email address (used as their login username)
    email: {
        type: String,
        required: true // Mandatory field required to register
    },
    // User's password (should be saved as a hashed string for security)
    password: {
        type: String,
        required: true // Mandatory field
    },
    // An array storing the ObjectIds of all events created by this specific user
    createdEvents: [
        {
            type: Schema.Types.ObjectId, // Stores MongoDB unique identifiers (IDs)
            ref: 'Event'                 // Connects each ID in the array to the 'Event' model
        }
    ]
});

// ==========================================
// 3. MODEL EXPORT
// ==========================================
// Compile the schema into a reusable model named 'User' and export it
// Mongoose will automatically target a collection named 'users' in MongoDB
module.exports = mongoose.model('User', userSchema);
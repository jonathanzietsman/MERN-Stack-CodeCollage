// ==========================================
// 1. MODULE IMPORTS
// ==========================================
// Import Mongoose to manage MongoDB data schemas and models
const mongoose = require('mongoose');

// Extract the Schema constructor from Mongoose
const Schema = mongoose.Schema;

// ==========================================
// 2. EVENT SCHEMA DEFINITION
// ==========================================
// Define the structure (blueprint) for every Event document saved in the database
const eventSchema = new Schema({
    // Name/title of the event
    title: {
        type: String,
        required: true // Field must be provided when creating an event
    },
    // Detailed description of what the event is about
    description: {
        type: String,
        required: true // Mandatory field
    },
    // Cost to attend the event
    price: {
        type: Number,
        required: true // Mandatory field
    },
    // Date and time when the event takes place
    date: {
        type: Date,
        required: true // Mandatory field
    },
    // Reference to the User who created and owns this event
    creator: {
        type: Schema.Types.ObjectId, // Stores a MongoDB unique identifier (ID)
        ref: 'User'                  // Connects this ID directly to the 'User' model
    }
});

// ==========================================
// 3. MODEL EXPORT
// ==========================================
// Compile the schema into a reusable model named 'Event' and export it
// Mongoose will automatically target a collection named 'events' in MongoDB
module.exports = mongoose.model('Event', eventSchema);
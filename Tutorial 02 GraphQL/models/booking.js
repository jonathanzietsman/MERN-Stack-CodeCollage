// ==========================================
// 1. MODULE IMPORTS
// ==========================================
// Import Mongoose to define database models and schemas for MongoDB
const mongoose = require('mongoose');

// Extract the Schema constructor from Mongoose
const Schema = mongoose.Schema;

// ==========================================
// 2. BOOKING SCHEMA DEFINITION
// ==========================================
// Define the structure (blueprint) for every Booking document in the database
const bookingSchema = new Schema(
    {
        // Reference to the Event being booked
        event: {
            type: Schema.Types.ObjectId, // Stores a MongoDB unique identifier (ID)
            ref: 'Event'                 // Tells Mongoose this ID links to the 'Event' model
        },
        // Reference to the User who made the booking
        user: {
            type: Schema.Types.ObjectId, // Stores a MongoDB unique identifier (ID)
            ref: 'User'                  // Tells Mongoose this ID links to the 'User' model
        }
    },
    // Options object: automatically adds `createdAt` and `updatedAt` Date fields to each booking
    { timestamps: true }
);

// ==========================================
// 3. MODEL EXPORT
// ==========================================
// Compile the schema into a reusable model named 'Booking' and export it
// Mongoose will automatically target a collection named 'bookings' in MongoDB
module.exports = mongoose.model('Booking', bookingSchema);
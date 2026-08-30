const Event = require('../../models/event'); // Mongoose model for Event documents
const Booking = require("../../models/booking"); // Mongoose model for Booking documents
const { transformBooking, transformEvent } = require('./merge'); // Helper functions to format returned data and populate nested fields

module.exports = {
    // Resolver to fetch all bookings belonging to the logged-in user
    bookings: async (args, req) => {
        // Protect endpoint: Ensure user is authenticated via isAuth middleware
        if (!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            // Find bookings in MongoDB created specifically by the current user
            const bookings = await Booking.find({user: req.userId});
            // Map through each booking and apply helper to format dates & populate related relations
            return bookings.map((booking) => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },

    // Resolver to create a new booking for a specific event
    bookEvent: async (args, req) => {
        // Protect endpoint: Check authentication
        if (!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        // Fetch the event using the provided ID parameter
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        
        // Instantiate a new Booking document linking the current user ID and target event
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent,
        });
        
        // Save the booking document into MongoDB
        const result = await booking.save();
        // Return the formatted booking document using the transform helper
        return transformBooking(result);
    },

    // Resolver to cancel/delete a booking and return the associated event
    cancelBooking: async (args, req) => {
        // Protect endpoint: Check authentication
        if (!req.isAuth){
            throw new Error('Unauthenticated!');
        }
        try {
            // Find booking by ID and populate its associated event data
            const booking = await Booking.findById(args.bookingId).populate("event");
            // Extract and format the event data before deleting the booking record
            const event = transformEvent(booking.event);
            
            // Delete the booking document from MongoDB
            await Booking.deleteOne({ _id: args.bookingId });
            // Return the canceled event details to client
            return event;
        } catch (err) {
            throw err;
        }
    },
};
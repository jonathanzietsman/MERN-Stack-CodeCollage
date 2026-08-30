const DataLoader = require('dataloader'); // Utility to batch and cache database requests to solve the N+1 problem

const Event = require('../../models/event'); // Mongoose Event model
const User = require('../../models/user'); // Mongoose User model
const { dateToString } = require('../../helpers/date'); // Helper function to convert dates to ISO strings

// DataLoader instance for batching event queries into a single database request
const eventLoader = new DataLoader((eventIds) => {
    return events(eventIds);
});

// DataLoader instance for batching user queries into a single database request
const userLoader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}});
});

// Fetch batch of events by IDs and preserve the exact order requested by DataLoader
const events = async eventIds => {
    try {
        // Find all events matching the array of IDs
        const events = await Event.find({ _id: { $in: eventIds } });
        
        // Sort results to match the exact order of eventIds array (required by DataLoader)
        events.sort((a, b) => {
            return(
                eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
            );
        });
        
        console.log(events, eventIds);
        
        // Return transformed events with formatted dates and creator references
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};

// Fetch a single event using the batched eventLoader
const singleEvent = async eventId => {
    try {
        const event = await eventLoader.load(eventId.toString());
        return event;
    } catch (err) {
        throw err;
    }
};

// Fetch user by ID using userLoader, lazy-loading their created events
const user = async (userId) => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id,
            // Lazy load array of created events on-demand using DataLoader loadMany
            createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
        };
    } catch (err) {
        throw err;
    }
};

// Transform an Event document to format date strings and bind the nested user resolver
const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator), // Lazy load creator details if requested in GraphQL query
    };
};

// Transform a Booking document to format date strings and bind nested event/user resolvers
const transformBooking = (booking) => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),       // Lazy load user details
        event: singleEvent.bind(this, booking._doc.event), // Lazy load single event details
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.createdAt),
    };
};

// Export helper functions to be used across resolvers
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
// Import individual resolver modules handling authentication, events, and bookings
const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');

// Combine all individual resolver objects into a single root resolver object using the spread operator (...)
const rootResolver = {
    ...authResolver,   // Exposes createUser and login resolvers
    ...eventsResolver, // Exposes events and createEvent resolvers
    ...bookingResolver // Exposes bookings, bookEvent, and cancelBooking resolvers
};

// Export the merged root resolver for use in express-graphql
module.exports = rootResolver;
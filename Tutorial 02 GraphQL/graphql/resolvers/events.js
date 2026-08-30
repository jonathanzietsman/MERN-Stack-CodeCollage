const Event = require("../../models/event"); // Mongoose model for Event documents
const User = require("../../models/user"); // Mongoose model for User documents
const { transformEvent } = require('./merge'); // Helper function to format date strings and populate creator details

module.exports = {
    // Resolver to fetch all events from the database
    events: async () => {
        try {
            // Retrieve all event documents from MongoDB
            const events = await Event.find();
            // Map through each event document and format it using the helper function
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },

    // Resolver to create a new event (protected endpoint)
    createEvent: async (args, req) => {
        // Protect endpoint: Ensure request passed JWT authentication middleware
        if (!req.isAuth){
            throw new Error('Unauthenticated!');
        }

        // Instantiate a new Event document with data from args.eventInput
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price, // Unary plus (+) converts string input into a Number
            date: new Date(args.eventInput.date), // Convert ISO date string to a JS Date object
            creator: req.userId, // Attach the logged-in user's ID as the creator
        });

        let createdEvent;
        try {
            // Save the new event document to MongoDB
            const result = await event.save();
            // Format the saved result for the GraphQL response
            createdEvent = transformEvent(result);

            // Find the user who created this event to update their relational list
            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error("User does not exist.");
            }

            // Push the new event ID into the user's createdEvents array
            creator.createdEvents.push(event);
            // Save updated user document back to MongoDB
            await creator.save();

            // Return the newly created and formatted event object
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};
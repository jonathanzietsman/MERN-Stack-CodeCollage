// ==========================================
// 1. MODULE IMPORTS
// ==========================================
// Import buildSchema from GraphQL to convert a schema string into a executable Schema object
const { buildSchema } = require("graphql");

// Export the compiled GraphQL schema
// Note: An exclamation mark (!) means the field is non-nullable (it will NEVER return null)
module.exports = buildSchema(`
    # ==========================================
    # 2. OBJECT TYPES (DATA MODELS)
    # ==========================================

    # Booking Type: Represents a user's reservation for an event
    type Booking {
        _id: ID!               # Unique MongoDB ID
        event: Event!          # Linked Event object
        user: User!            # Linked User object who made the booking
        createdAt: String!     # ISO timestamp when the booking was created
        updatedAt: String!     # ISO timestamp when the booking was last updated
    }

    # Event Type: Represents an event created in the system
    type Event {
        _id: ID!               # Unique MongoDB ID
        title: String!         # Name of the event
        description: String!   # Details about the event
        price: Float!          # Cost of entry (floating-point number)
        date: String!          # Event date/time stored as an ISO string
        creator: User!         # Linked User object who created the event
    }

    # User Type: Represents an account registered in the system
    type User {
        _id: ID!               # Unique MongoDB ID
        email: String!         # User's email address
        password: String       # Optional/Nullable so hashed passwords aren't accidentally exposed
        createdEvents: [Event!] # Array of Event objects created by this user
    }

    # AuthData Type: Response object returned upon successful login
    type AuthData {
        userId: ID!            # ID of the authenticated user
        token: String!         # Encrypted JSON Web Token (JWT) for authentication
        tokenExpiration: Int!  # Duration (in hours) before the token expires
    }

    # ==========================================
    # 3. INPUT TYPES (DATA SENT FROM FRONTEND)
    # ==========================================

    # EventInput: Data payload required when creating a new event
    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    # UserInput: Data payload required when registering a new user
    input UserInput {
        email: String!
        password: String!
    }

    # ==========================================
    # 4. ENTRY POINTS (QUERIES & MUTATIONS)
    # ==========================================

    # RootQuery: Defines all read-only API endpoints (fetching data)
    type RootQuery {
        events: [Event!]!                              # Fetch a list of all events
        bookings: [Booking!]!                          # Fetch a list of all user bookings
        login(email: String!, password: String!): AuthData! # Authenticate user and return a JWT
    }

    # RootMutation: Defines all endpoints that create, update, or delete data
    type RootMutation {
        createEvent(eventInput: EventInput): Event     # Create a new event
        createUser(userInput: UserInput): User         # Register a new user
        bookEvent(eventId: ID!): Booking!              # Reserve a spot for an event
        cancelBooking(bookingId: ID!): Event!          # Cancel a booking and return the related Event
    }

    # ==========================================
    # 5. SCHEMA ENTRY DEFINITION
    # ==========================================
    # Links the RootQuery and RootMutation types to the main GraphQL schema endpoints
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
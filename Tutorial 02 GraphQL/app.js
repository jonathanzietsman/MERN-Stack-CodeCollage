// ==========================================
// 1. DNS CONFIGURATION
// ==========================================
// Import Node's built-in DNS module
const dns = require('dns');
// Force Node to use Google's public DNS servers to prevent DNS lookup issues on local networks
dns.setServers(['8.8.8.8', '8.8.4.4']);
// Prefer IPv4 addresses over IPv6 when resolving hostnames (helps avoid connection timeouts)
dns.setDefaultResultOrder('ipv4first');

// ==========================================
// 2. DEPENDENCY IMPORTS
// ==========================================
// Core web framework for building the API and handling HTTP requests
const express = require('express');
// Middleware to parse incoming request bodies (like JSON payloads)
const bodyParser = require('body-parser');
// Middleware that integrates Express with GraphQL
const { graphqlHTTP } = require('express-graphql');
// Object Data Modeling (ODM) library for MongoDB
const mongoose = require('mongoose');

// ==========================================
// 3. CUSTOM MODULE IMPORTS
// ==========================================
// Defines the API data structure (Types, Queries, and Mutations)
const graphQlSchema = require('./graphql/schema/index');
// Functions that execute the logic behind the GraphQL queries and mutations
const graphQlResolvers = require('./graphql/resolvers/index');
// Custom middleware to verify JWT tokens and attach auth status to incoming requests
const isAuth = require('./middleware/is-auth');

// Initialize the Express application
const app = express();

// ==========================================
// 4. GLOBAL MIDDLEWARE SETUP
// ==========================================
// Parse incoming JSON data so it's accessible via `req.body`
app.use(bodyParser.json());

// CORS (Cross-Origin Resource Sharing) Headers
// Allows frontend applications hosted on different domains/ports to access this server
app.use((req, res, next) => {
    // Allow access from any origin ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Specify which HTTP methods are permitted
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    // Specify allowed headers in incoming requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight OPTIONS requests sent automatically by browsers prior to POST requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    // Pass control to the next middleware function in the stack
    next();
});

// Run the authentication check on every incoming request before reaching endpoints
app.use(isAuth);

// ==========================================
// 5. GRAPHQL ENDPOINT SETUP
// ==========================================
// Set up the single endpoint where all GraphQL requests are handled
app.use(
    '/graphql', 
    graphqlHTTP({
        schema: graphQlSchema,      // The GraphQL schema definitions
        rootValue: graphQlResolvers, // The resolver functions mapping to the schema
        graphiql: true              // Enables the GraphiQL web UI in browser for testing queries
    })
);

// ==========================================
// 6. DATABASE CONNECTION & SERVER START
// ==========================================
// Retrieve database credentials stored in environment variables (for security)
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const db = process.env.MONGO_DB;

// MongoDB Atlas cloud connection string
const uri = `mongodb+srv://${user}:${pass}@cluster0.evb21gx.mongodb.net/${db}?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose with a 5-second timeout safeguard
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    // Start listening for HTTP requests on port 8000 only after database connects
    app.listen(8000, () => console.log('Server is running on port 8000!'));
  })
  .catch(err => {
    // Log an error message if the database connection fails
    console.error('DB Connection Error:', err.message);
  });
// ==========================================
// 1. DEPENDENCY IMPORTS
// ==========================================
// Import JsonWebToken library to verify and decode encrypted tokens
const jwt = require('jsonwebtoken');

// ==========================================
// 2. AUTHENTICATION MIDDLEWARE
// ==========================================
// Express middleware function to inspect and validate request authentication tokens
module.exports = (req, res, next) => {
    // Read the 'Authorization' header from the incoming request (e.g., "Bearer <token_string>")
    const authHeader = req.get('Authorization');
    
    // Check 1: If no Authorization header exists at all
    if (!authHeader) {
        req.isAuth = false; // Flag request as unauthenticated
        return next();      // Pass request to GraphQL without throwing an error
    }
    
    // Split the header string ("Bearer <token>") to extract just the token part
    const token = authHeader.split(' ')[1];
    
    // Check 2: If the token is missing or an empty string after splitting
    if (!token || token === '') {
        req.isAuth = false; // Flag request as unauthenticated
        return next();      // Continue execution flow
    }
    
    let decodedToken;
    try {
        // Check 3: Verify the token's signature using the secret key
        // Throws an error if the token is expired, tampered with, or malformed
        decodedToken = jwt.verify(token, 'somesupersecretkey');
    } catch (err) {
        req.isAuth = false; // Flag request as unauthenticated on verification failure
        return next();      // Continue execution flow
    }
    
    // Check 4: Double-check if decoding returned a valid payload object
    if (!decodedToken) {
        req.isAuth = false; // Flag request as unauthenticated
        return next();      // Continue execution flow
    }
    
    // Success: Token is completely valid and verified!
    req.isAuth = true;                  // Flag request as fully authenticated
    req.userId = decodedToken.userId;   // Attach the user's ID to the request object for resolvers to use
    
    // Pass control to the next middleware or GraphQL resolver
    next();
};
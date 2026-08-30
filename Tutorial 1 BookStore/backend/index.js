// ============================================================
// index.js
// ------------------------------------------------------------
// PURPOSE: This is the entry point of the backend. It:
//   1. Creates the Express app
//   2. Wires up middleware (JSON body parsing, CORS)
//   3. Registers the /books routes
//   4. Connects to MongoDB, and only starts listening for
//      requests once that connection succeeds
// ============================================================

import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

// Create the Express application instance.
const app = express();

// --- Middleware ---------------------------------------------

// Lets Express automatically parse incoming JSON request bodies
// into request.body (needed for POST/PUT requests from the frontend).
app.use(express.json());

// Allows requests from other origins (e.g. our React app running on
// a different port like localhost:5173) to hit this API.
// Currently wide open (any origin allowed) which is fine for local
// development but should be locked down for production.
app.use(cors());

// Example of a stricter CORS config, kept here for reference in case
// we need to restrict this to just our frontend's URL later.
// app.use(cors({
//     origin: 'http://localhost:3000/',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

// --- Routes ----------------------------------------------------

// Simple health-check / welcome route at the root URL.
app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to mern stack");
});

// Any request starting with /books gets handed off to our
// dedicated books router (see routes/bookRoute.js). That router
// defines the actual GET/POST/PUT/DELETE handlers.
app.use("/books", booksRoute);

// --- Database connection + server start -------------------------

// Connect to MongoDB first. We only start the Express server
// (app.listen) INSIDE the .then() so we never accept requests
// before the database connection is actually ready.
mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("App connected to database");
		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`);
		});
	})
	.catch((error) => {
		// If the DB connection fails, we log the error and the
		// server simply never starts listening.
		console.log(error);
	});

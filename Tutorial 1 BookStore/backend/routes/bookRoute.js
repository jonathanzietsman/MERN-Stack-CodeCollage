// ============================================================
// bookRoute.js
// ------------------------------------------------------------
// PURPOSE: Defines all the CRUD (Create, Read, Update, Delete)
// HTTP endpoints for the "books" resource. This router gets
// mounted at /books in index.js, so e.g. router.get('/') below
// actually handles GET requests to http://localhost:5555/books
// ============================================================

import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// ---------------------------------------------------------------
// CREATE — POST /books
// Saves a brand new book to the database.
// ---------------------------------------------------------------
router.post("/", async (request, response) => {
	try {
		// Basic validation: make sure the client actually sent
		// all three required fields before we try to save anything.
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author and publishYear",
			});
		}

		// Build a plain object matching our schema shape.
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
		};

		// Book.create() inserts the new document into MongoDB
		// and returns the saved document (including its new _id).
		const book = await Book.create(newBook);

		// 201 = "Created" — the standard status code for a
		// successful POST that created a new resource.
		return response.status(201).send(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// ---------------------------------------------------------------
// READ ALL — GET /books
// Returns every book currently in the database.
// ---------------------------------------------------------------
router.get("/", async (request, response) => {
	try {
		// An empty filter {} means "match everything".
		const books = await Book.find({});
		return response.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// ---------------------------------------------------------------
// READ ONE — GET /books/:id
// Returns a single book by its MongoDB _id.
// ---------------------------------------------------------------
router.get("/:id", async (request, response) => {
	try {
		// :id in the URL is captured into request.params.id
		const { id } = request.params;
		const book = await Book.findById(id);

		return response.status(200).json(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// ---------------------------------------------------------------
// UPDATE — PUT /books/:id
// Replaces/updates an existing book's fields.
// ---------------------------------------------------------------
router.put("/:id", async (request, response) => {
	try {
		// Same required-field validation as the create route.
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author and publishYear",
			});
		}

		const { id } = request.params;

		// findByIdAndUpdate looks up the book by id and applies
		// the new field values from request.body in one step.
		const result = await Book.findByIdAndUpdate(id, request.body);

		// If no document was found with that id, result will be
		// null/undefined — respond with a 404 instead of a false
		// "success" message.
		if (!result) {
			return response.status(404).json({ message: "Book Not Found" });
		}
		return response.status(200).send({ message: "Book Updated" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// ---------------------------------------------------------------
// DELETE — DELETE /books/:id
// Removes a book from the database.
// ---------------------------------------------------------------
router.delete("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const result = await Book.findByIdAndDelete(id, request.body);

		if (!result) {
			return response.status(404).json({ message: "Book Not Found" });
		}
		return response.status(200).send({ message: "Book Deleted" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

export default router;

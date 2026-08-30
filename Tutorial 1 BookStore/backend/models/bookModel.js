// ============================================================
// bookModel.js
// ------------------------------------------------------------
// PURPOSE: Defines the Mongoose SCHEMA and MODEL for a "book"
// document. The schema describes the shape/validation rules of
// the data, and the model is what we actually use elsewhere in
// the app (e.g. bookRoute.js) to query/create/update/delete
// documents in MongoDB.
// ============================================================

import mongoose from "mongoose"

// Define the shape of a book document.
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true   // every book MUST have a title
        },
        author: {
            type: String,
            required: true   // every book MUST have an author
        },
        publishYear: {
            type: Number,
            required: true   // every book MUST have a publish year
        },
    },
    {
        // timestamps: true automatically adds createdAt and updatedAt
        // fields to every document, managed by Mongoose.
        timestamps: true,
    }
);


// Create the model from the schema above.
//
// NOTE: The first argument to mongoose.model() is the model NAME,
// which Mongoose uses (lowercased + pluralized) to decide the
// MongoDB collection name. Here it's set to 'Cat', which means
// documents will actually be stored in a collection called
// "cats" rather than "books". This still works correctly for
// this app since we only ever use the exported `Book` model
// consistently, but the name is a bit misleading if someone
// looks directly in the database (worth renaming to 'Book' if
// you want the collection name to make sense at a glance).
export const Book = mongoose.model('Cat', bookSchema)
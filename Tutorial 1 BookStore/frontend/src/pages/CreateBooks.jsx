// ============================================================
// CreateBooks.jsx
// ------------------------------------------------------------
// PURPOSE: Form page ("/books/create") for adding a brand new
// book. Collects title/author/publishYear in local state and
// POSTs them to the backend when "Save" is clicked.
// ============================================================

import React, { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
	// One piece of state per form field (controlled inputs).
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publishYear, setPublishYear] = useState("");
	// Shows the spinner while the POST request is in flight.
	const [loading, setLoading] = useState(false);
	// Lets us redirect back to "/" after a successful save.
	const navigate = useNavigate();
	// Shows toast notifications (success/error) after the save attempt.
	const { enqueueSnackbar } = useSnackbar();

	const handleSaveBook = () => {
		// Bundle the current form values into the shape the API expects.
		const data = {
			title,
			author,
			publishYear,
		};
		setLoading(true);
		axios
			.post(`http://localhost:5555/books`, data)
			.then(() => {
				setLoading(false);
				enqueueSnackbar("Book created successfully", { variant: "success" });
				// Go back to the book list once creation succeeds.
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				// alert("An error occured. Check console for more info...");
				enqueueSnackbar("Error creating book", { variant: "error" });
				console.log(error);
			});
	};

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Create Book</h1>
			{loading ? <Spinner /> : ""}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				{/* Controlled input: value comes from state, onChange updates state */}
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Author</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Publish Year</label>
					<input
						type="number"
						value={publishYear}
						onChange={(e) => setPublishYear(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
					Save
				</button>
			</div>
		</div>
	);
};

export default CreateBooks;
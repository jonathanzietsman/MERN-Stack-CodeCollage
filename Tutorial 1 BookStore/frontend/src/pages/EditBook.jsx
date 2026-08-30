// ============================================================
// EditBook.jsx
// ------------------------------------------------------------
// PURPOSE: Form page ("/books/edit/:id") that loads an existing
// book's data into the form fields, lets the user change them,
// and PUTs the updated data back to the backend on save.
// ============================================================

import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publishYear, setPublishYear] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	// The book's id, taken from the URL (/books/edit/:id).
  	const {id} = useParams();
	const { enqueueSnackbar } = useSnackbar();

  // On mount, fetch the existing book so the form starts pre-filled
  // with its current values instead of being blank.
  useEffect(() => {
    // console.log('id from params:', id);
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author)
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('ERROR. Check the console!');
        console.log(error);
      })
  }, [])

	const handleEditBook = () => {
		// Bundle the (possibly edited) form values to send to the API.
		const data = {
			title,
			author,
			publishYear,
		};
		setLoading(true);
		axios
			.put(`http://localhost:5555/books/${id}`, data)
			.then(() => {
				setLoading(false);
				enqueueSnackbar("Book updated successfully", { variant: "success" });
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				// alert("An error occured. Check console for more info...");
				enqueueSnackbar("Error updating book", { variant: "error" });
				console.log(error);
			});
	};

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Edit Book</h1>
			{loading ? <Spinner /> : ""}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
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
				<button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditBook;
// ============================================================
// Home.jsx
// ------------------------------------------------------------
// PURPOSE: The landing page ("/"). Fetches every book from the
// backend and displays them either as a table or as a grid of
// cards, depending on which view the user has selected.
// ============================================================

import React, { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable.jsx";
import BooksCard from "../components/home/BooksCard.jsx";

const Home = () => {
	// Holds the list of books returned from the API.
	const [books, setBooks] = useState([]);
	// Tracks whether we're waiting on the API call, so we can show a spinner.
	const [loading, setLoading] = useState(false);
	// Controls which layout is shown: "table" or "Card".
    const [showType, setShowType] = useState("table");

	// Runs once when the component first mounts ([] dependency array)
	// to load the book list from the backend.
	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:5555/books")
			.then((response) => {
				// The API responds with { count, data }, so we only need .data.
				setBooks(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	return (
		<div className="p-4">
			{/* Toggle buttons to switch between table and card layout */}
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                onClick={() => setShowType("table")}>
                    Table View
                </button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                onClick={() => setShowType("Card")}>
                    Card View
                </button>

            </div>
			<div className="flex-justify-between items-center">
				<h1 className="text-3xl my-8">Books List</h1>
				{/* Link to the "create book" form page */}
				<Link to="/books/create">
					<MdOutlineAddBox className="text-sky-800 text-4xl" />
				</Link>
			</div>

			{/* While loading -> show spinner.
			    Once loaded -> show the table or card view based on showType. */}
			{loading ? <Spinner /> :  showType === "table" ? <BooksTable books={books} /> : <BooksCard books={books} />}
		</div>
	);
};

export default Home;
// ============================================================
// DeleteBooks.jsx
// ------------------------------------------------------------
// PURPOSE: Confirmation page ("/books/delete/:id") shown before
// permanently removing a book. Only sends the DELETE request
// once the user clicks the confirm button.
// ============================================================

import React, { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // The id of the book to delete, taken from the URL.
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        // Send the user back to the book list after deleting.
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('Error. Check console!')
        enqueueSnackbar("Error deleting book", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure you would like to DELETE this book??
        </h3>
        {/* Only fires the actual DELETE request when clicked —
            simply visiting this page does NOT delete anything. */}
        <button
        className="p-4 bg-red-600 text-white m-8 w-full"
        onClick={handleDeleteBook}>
          Yes, Delete Book
        </button>
      </div>
    </div>
  )
}

export default DeleteBooks
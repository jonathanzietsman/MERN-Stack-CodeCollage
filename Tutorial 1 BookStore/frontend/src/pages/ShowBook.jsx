// ============================================================
// ShowBook.jsx
// ------------------------------------------------------------
// PURPOSE: Read-only detail page ("/books/details/:id") that
// fetches and displays a single book's full information.
// ============================================================

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'

const ShowBook = () => {

  // Holds the single book object once it's fetched.
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  // Pulls the :id segment out of the current URL, e.g. /books/details/64f...
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])
  

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ?(
        <Spinner />
      ) : (
        // Once loaded, just render each field of the book object.
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            {/* NOTE: this uses book.createdAt again instead of
                book.updatedAt — likely a copy/paste leftover from the
                row above. Worth changing to book.updatedAt if you want
                this to actually reflect the last edit time. */}
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook
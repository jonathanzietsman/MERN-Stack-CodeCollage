// ============================================================
// BookSingleCard.jsx
// ------------------------------------------------------------
// PURPOSE: Renders one individual book "card" used in the grid
// (BooksCard.jsx). Shows the book's info plus action icons, and
// also owns the local state for whether the quick-view modal
// (BookModal.jsx) is currently open.
// ============================================================

import { Link } from'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import { BsInfoCircle } from 'react-icons/bs'
import { useState } from 'react'
import BookModal from './BookModal.jsx'

// Receives a single book object as a prop.
const BookSingleCard = ({book}) => {

    // Whether the "quick view" modal for this book is open.
    const [showModal, setShowModal] = useState(false)

  return (
    <div key = {book._id}
            className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
            >
                {/* Publish year badge, pinned to the top-right corner */}
                <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
                    {book.publishYear}
                </h2>
                <h4 className='my-2 text-gray-500'>
                    {book._id}
                </h4>
                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{book.title}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <BiUserCircle className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{book.author}</h2>
                </div>
                <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                    {/* "Show" icon opens the quick-view modal in place,
                        instead of navigating to a new page */}
                    <BiShow 
                        className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                        onClick={() => setShowModal(true)}
                    />
                    <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-green-800 hover:text-black' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                    </Link>
                </div>

                {/* Modal only renders (and is only in the DOM) while showModal is true */}
                {showModal && (<BookModal book={book} onClose={() => setShowModal(false)} />)}

            </div>
  )
}

export default BookSingleCard
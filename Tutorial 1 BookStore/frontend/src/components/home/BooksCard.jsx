// ============================================================
// BooksCard.jsx
// ------------------------------------------------------------
// PURPOSE: Renders the list of books as a responsive grid of
// cards instead of a table. Used by Home.jsx when the user has
// selected "Card View". Each individual card's markup lives in
// BookSingleCard.jsx — this component just lays them out in a grid.
// ============================================================

import { Link } from'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import { BsInfoCircle } from 'react-icons/bs'
import BookSingleCard from './BookSingleCard.jsx'

const BooksCard = ({books}) => {
  return (
    // Responsive grid: 1 column by default, growing to 2/3/4
    // columns as the screen gets wider (sm/lg/xl breakpoints).
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((item) => (
            <BookSingleCard key={item._id} book={item} />
        ))}
    </div>
  )
}

export default BooksCard
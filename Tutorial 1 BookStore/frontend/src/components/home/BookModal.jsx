// ============================================================
// BookModal.jsx
// ------------------------------------------------------------
// PURPOSE: Popup/overlay "quick view" for a book, opened from
// BookSingleCard.jsx when the user clicks the eye icon. Closes
// when the user clicks the X, or clicks anywhere on the dark
// backdrop outside the modal box.
// ============================================================

import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

// book  -> the book to display
// onClose -> callback from the parent to close the modal (sets showModal to false)
const BookModal = ({book, onClose}) => {
    return (
        // Full-screen dark backdrop. Clicking it calls onClose.
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'
        onClick={onClose}
        >
            <div
            // Stops the click from "bubbling up" to the backdrop above,
            // so clicking INSIDE the modal box does NOT close it.
            onClick={(event) => event.stopPropagation()}
            className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
            >
                {/* Explicit close (X) button, in addition to the backdrop click */}
                <AiOutlineClose 
                className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' 
                onClick={onClose}
                />

                <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
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
                <p className='mt-4'>Anything you want to show</p>
                {/* Placeholder lorem ipsum text — swap this out for real
                    book details (e.g. a description field) later if needed. */}
                <p className='my-2'>
                    lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                </p>
            </div>
        </div>
    )
}

export default BookModal
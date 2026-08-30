// ============================================================
// BackButton.jsx
// ------------------------------------------------------------
// PURPOSE: Small reusable navigation button used at the top of
// every page except Home. Defaults to linking back to "/", but
// can be pointed anywhere via the `destination` prop.
// ============================================================

import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

// destination defaults to '/' if the caller doesn't pass one in.
const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
        <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
            <BsArrowLeft className='text-2xl' />
        </Link>
      
    </div>
  )
}

export default BackButton
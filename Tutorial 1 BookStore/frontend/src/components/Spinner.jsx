// ============================================================
// Spinner.jsx
// ------------------------------------------------------------
// PURPOSE: Tiny loading indicator shown while a page is waiting
// on an API request. Purely presentational — no props, no state.
// The "spinning" look comes entirely from Tailwind's built-in
// animate-ping utility class, which pulses/expands the circle.
// ============================================================

import React from 'react'

const Spinner = () => {
  return (
    <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'>
      
    </div>
  )
}

export default Spinner
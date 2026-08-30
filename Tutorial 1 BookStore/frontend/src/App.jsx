// ============================================================
// App.jsx
// ------------------------------------------------------------
// PURPOSE: Top-level component that defines all client-side
// routes for the app using react-router-dom. Each <Route>
// maps a URL path to the page component that should render
// when the user navigates there.
// ============================================================

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateBook from './pages/CreateBooks.jsx'
import ShowBook from './pages/ShowBook.jsx'
import EditBook from './pages/EditBook.jsx'
import DeleteBook from './pages/DeleteBooks.jsx'

const App = () => {
  return (
    <Routes>
      {/* Home page — lists all books (table/card view) */}
      <Route path='/' element= {<Home/>} />

      {/* Form page for adding a new book */}
      <Route path='/books/create' element= {<CreateBook/>} />

      {/* :id is a URL parameter — read via useParams() in ShowBook.jsx */}
      <Route path='/books/details/:id' element= {<ShowBook/>} />

      {/* Form page pre-filled with the book's current data */}
      <Route path='/books/edit/:id' element= {<EditBook/>} />

      {/* Confirmation page before deleting a book */}
      <Route path='/books/delete/:id' element= {<DeleteBook/>} />
    </Routes>
  )
}

export default App
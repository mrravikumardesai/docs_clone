import React from 'react'
import DocumentPage from './DocumentPage.tsx'
import {
  BrowserRouter,
  Route,
  Routes,
  redirect,
} from "react-router-dom"
import HomePage from './HomePage.tsx'
import LoginPage from './LoginPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/document/:id' element={<DocumentPage />} />
      </Routes>

    </BrowserRouter>
  )

}

export default App
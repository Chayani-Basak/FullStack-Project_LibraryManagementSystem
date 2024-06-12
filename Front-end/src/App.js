import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import { Home } from './layouts/HomePage/Home';
import { About } from './layouts/HomePage/About';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import  { SearchBooksPage } from './layouts/SearchBooks/SearchBooksPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import SignUp from './layouts/SignUp_SignIn/SignUp';
import SignIn from './layouts/SignUp_SignIn/SignIn'; 
import { AdminPage } from './layouts/AdminActivities/AdminPage';

export const App=() => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar/>
      <div className='flex-grow-1'>
        <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<><Home/><About/></>} />
          <Route path='/search' element={<SearchBooksPage/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/shelf' element={<ShelfPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </div>
    <Footer/>
    </div> 
  );
}

export default App;

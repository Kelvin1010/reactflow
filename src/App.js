import React from 'react'
import Home from './pages/Home';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Analysis from './pages/Analysis';
import ForgotPassword from './pages/ForgotPassword';
import Setting from './pages/Setting';

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/analysis' element={ <Analysis /> } />
            <Route path='/settings' element={ <Setting /> } />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  )
}

export default App
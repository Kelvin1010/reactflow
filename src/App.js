import React from 'react'
import Home from './pages/Home';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Analysis from './pages/Analysis';
import AutoDraw from './pages/AutoDraw';
import NewProject from './pages/NewProject';

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/analysis' element={ <Analysis /> } />
            <Route path='/openfile' element={ <AutoDraw /> } />
            <Route path='/newproject' element={ <NewProject /> } />
          </Routes>
        </>
      </BrowserRouter>
    </>
  )
}

export default App
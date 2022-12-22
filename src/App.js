import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<div className='ui container' ><Home/></div>} />
      <Route path='*' element={<Home/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
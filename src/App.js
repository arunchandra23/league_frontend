import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/admin' element={<Home/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
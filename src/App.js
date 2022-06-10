import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Test from './components/Test'
import Homepage from './Pages/Homepage';
import Signup from './Pages/Signup';
import Gallery from './Pages/Gallery';
import VideoText from './components/VideoText';
import RequireAuth from './Helpers/RequireAuth';
import Upload from './Pages/Upload';
import Layout from './Helpers/Layout'
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>

      <Route path='/'>
          <Route index element={<Homepage/>} />
          <Route element={<RequireAuth />}>
            <Route path='gallery' element={<Gallery/>} />
            <Route path='profile' element={<VideoText/>} />
            <Route path='upload' element={<Upload />} />
          </Route>

      </Route>

        <Route path='/login' element={<Signup/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/test' element={<Test/>} />
      </Route>
    </Routes>
   
   </BrowserRouter>
  );
}

export default App;

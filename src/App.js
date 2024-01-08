import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import TollStart from './Components/TollStart';
import TollUpload from './Components/TollUpload';
import Home from './Components/Home';
import Guest from './Components/Guest'
import GuestUpload from './Components/GuestUpload';
import GuestDetails from './Components/GuestDetails';
// import TollLogin from "./Components/TollLogin";
import './all_css/Home.css';
import './all_css/TollLogin.css';
import './all_css/TollStart.css';
import './all_css/TollUpload.css';
import './all_css/Guest.css';
import './all_css/GuestDetails.css';
import './all_css/GuestUpload.css';
import './all_css/Loader.css';
import Loader from './Components/Loader';
import './stylesheet.css';
import './street_cred-webfont.woff';
import './street_cred-webfont.woff2';

const NotFound = () => <h1>404 Error.
  The page you are looking for does not exist
</h1>;


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/loader' element={<Loader />} /> 
          {/* <Route path='/signIn' element={<Start/>}/> */}
          {/* <Route path='/toll' element={<TollStart />} /> */}
          <Route path='/toll/upload' element={<TollUpload />} />
          <Route path='/guest' element={<Guest />} />
          <Route path='/guest/upload' element={<GuestUpload />} />
          <Route path='/guest/checkdetails' element={<GuestDetails />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
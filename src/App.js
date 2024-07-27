import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Constants/Navbars/NavbarUser'

// MAIN PAGES 
import Home from './components/MainPages/1_Home';
import About from './components/MainPages/2_About';
import Contact from './components/MainPages/3_Contact';
import Error from './components/MainPages/10_Error';

// USER PAGES 
import UserRegistrationPage from './components/Registration_Login/userRegistration.js';
import UserLogin from './components/Registration_Login/userLogin.js';
import ProductsPage from './components/ProductsPage';

// ADMIN PAGES 
import AdminLogin from './components/Registration_Login/adminLogin.js';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* MAIN PAGES  */}
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element ={<About/>} />
        <Route path="/contact" element ={<Contact/>} />
        <Route path="*" element={<Error />} />

        {/* USER PAGES  */}
        <Route path="/userregistration" element={<UserRegistrationPage/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/products" element={<ProductsPage/>} />

        {/* ADMIN PAGES  */}
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;

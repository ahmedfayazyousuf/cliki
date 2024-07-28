import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Error from './components/Error';
import UserRegistrationPage from './components/Registration_Login/userRegistration';
import UserLogin from './components/Registration_Login/userLogin';
import ProductsPage from './components/ProductsPage';
import AdminLogin from './components/Registration_Login/adminLogin';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/AdminDashboard/PrivateRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* MAIN PAGES */}
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Error />} />

        {/* USER PAGES */}
        <Route path="/userregistration" element={<UserRegistrationPage />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* ADMIN PAGES */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;

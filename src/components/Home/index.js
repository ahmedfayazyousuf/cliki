import React from 'react';
import Navbar from '../../Constants/Navbars';
import logo from '../../1_MediaAssets/Images/BrandAssets/LogoMainGreen.png'

const userLogin = () => {
 
  return (
    <>
      <Navbar />
      <div className="signup-container" style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: '#f2f2f2'}}>
        <img alt='logo' src={logo} className="headerText"/>
        Welcome to Cliki shopping mart, a <br/> test project for Fliki
      </div>
    </>
  );
};

export default userLogin;
